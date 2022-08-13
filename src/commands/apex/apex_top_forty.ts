import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexTopForty extends AppCommand {
  code = 'top_one_hundred'; // 只是用作标记
  trigger = 'top40'; // 用于触发的文字
  help = '发送`.apex top40`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      const res = await getCurrentLeaderboard();
      const data = res.data;
      const test = constructCard(data)
      console.log("goutou test: ", test);
      return session.sendCard(constructCard(data));
    } catch (err) {
      return session.quote('查询失败, 可能是一个bug, 请休息一下并且联系开发者~')
    }
  };
}

const getCurrentLeaderboard = () => {
  return axios.get(`https://api.mozambiquehe.re/leaderboard?auth=${auth.apexTracker}&legend=Any&platform=PC&key=rankScore`)
}

const streamerSuperLink = (streamerId: string) => {
  switch (streamerId) {
    case "DF_Pite":
      return '[DF_Pite](https://www.douyu.com/5684726)';
      break;

    case "DF_3Mz_o":
      return '[DF_3Mz_o](https://www.douyu.com/1667826)';
      break;
    default:
      return streamerId;
      break;
  }
}

const playerFiller = (rank: string, playerId: string, points: string) => (`{
  "type": "section",
  "text": {
    "type": "paragraph",
    "cols": 3,
    "fields": [
      {
        "type": "kmarkdown",
        "content": "${rank}"
      },
      {
        "type": "kmarkdown",
        "content": "${streamerSuperLink(playerId)}"
      },
      {
        "type": "kmarkdown",
        "content": "${points}"
      }
    ]
  }
}`)

const convertEpochToDate = (epoch: string) => {
  // reference: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
  const e = new Date(0);
  e.setUTCSeconds(parseInt(epoch));
  const d = new Date(e).toLocaleDateString("zh-CN", {
    hour: 'numeric', hourCycle: 'h12',
    dayPeriod: 'long', timeZone: 'Asia/Shanghai'
  });
  return d;
}


const constructCard = (data: any) => {


  const headerContext = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "Apex大逃杀榜单（PC端）"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**排名**"
              },
              {
                "type": "kmarkdown",
                "content": "**玩家**"
              },
              {
                "type": "kmarkdown",
                "content": "**分数**"
              }
            ]
          }
        }`

  const latestUpdate = convertEpochToDate(data.meta.lastUpdate);
  const tailContext = `,{
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "最后更新于 北京时间 ${latestUpdate}"
          }},{
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com](https://apexlegendsstatus.com)"
          }
        }]}]`

  let res = '';
  res += headerContext;
  for (let i = 0; i < 40; i++) {
    const playerInfo = data.data[i];

    res += ',' + playerFiller((i + 1).toString(), playerInfo.name, playerInfo.value)

  }
  res += tailContext;
  return res;
}


export const apexTopForty = new ApexTopForty();