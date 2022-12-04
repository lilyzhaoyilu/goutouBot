import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
import { convertEpochToDate, streamerSuperLink } from './apex_utils';
const axios = require('axios');

class ApexTopTen extends AppCommand {
  code = 'top_ten'; // 只是用作标记
  trigger = 'top10'; // 用于触发的文字
  help = '发送`.apex top10`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      const res = await getCurrentLeaderboard();
      const data = res.data;
      return session.sendCard(constructCard(data));
    } catch (err) {
      session.client.API.message.create(9, '9682242694390929', `top10挂了`);
      return session.quote('查询失败, 可能是一个bug, 请休息一下并且联系开发者~')
    }
  };
}

const getCurrentLeaderboard = () => {
  return axios.get(`https://api.mozambiquehe.re/leaderboard?auth=${auth.apexTracker}&legend=Any&platform=PC&key=rankScore`)
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
  const numberOfPlayers = Number(data.meta.numberOfPlayers);
  const interationNumber = numberOfPlayers > 10 ? 10 : numberOfPlayers
  const tailContext = `,{
                        "type": "section",
                        "text": {
                          "type": "kmarkdown",
                          "content": "最后更新于 北京时间 ${latestUpdate}"
                        }
                      },{
                        "type": "section",
                        "text": {
                          "type": "kmarkdown",
                          "content": "如果榜上有国内主播，并且他的名字没有连接到直播间的请私信机器人。第一个私信的赠送通行证升级码或者其他小礼物。主播们改名字太快了:sob:"
                        }
                      },{
                        "type": "section",
                        "text": {
                          "type": "kmarkdown",
                          "content": "数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com](https://apexlegendsstatus.com)"
                        }
                      }]}]`

  let res = '';
  res += headerContext;
  for (let i = 0; i < interationNumber; i++) {
    const playerInfo = data.data[i];

    res += ',' + playerFiller((i + 1).toString(), playerInfo.name, playerInfo.value)

  }
  res += tailContext;
  return res;
}


export const apexTopTen = new ApexTopTen();