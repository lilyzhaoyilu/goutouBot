import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import { convertEpochToDate, streamerSuperLink, rankToImage } from './apex_utils';
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
      session.replyCard(constructInfoCard(data));
      return session.replyCard(constructCard(data));
    } catch (err) {
      session.client.API.message.create(9, '9682242694390929', `top40挂了`);
      return session.quote('查询失败, 狗头已经收到错误提醒，会在周末的时候修复~')
    }
  };
}

class ApexTopFifty extends AppCommand {
  code = 'top_one_hundred'; // 只是用作标记
  trigger = 'top50'; // 用于触发的文字
  help = '发送`.apex top50`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      const res = await getCurrentLeaderboard();
      const data = res.data;
      session.replyCard(constructInfoCard(data));
      return session.replyCard(constructCard(data));
    } catch (err) {
      session.client.API.message.create(9, '9682242694390929', `top50挂了`);
      return session.quote('查询失败, 狗头已经收到错误提醒，会在周末的时候修复~')
    }
  };
}

const constructInfoCard = (data: any) => {
  return `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "下一条消息就是PC端榜单啦 :dog: 现在已经是top50了哦"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "如果榜上有国内主播，并且他的名字没有连接到直播间的请私信机器人。第一个私信的赠送通行证升级码或者其他小礼物。主播们改名字太快了:sob:"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "榜单更新于 北京时间 ${convertEpochToDate(data.meta.lastUpdate)}"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com](https://apexlegendsstatus.com)"
          }
        }
      ]
    }
  ]`
}

const getCurrentLeaderboard = () => {
  return axios.get(`https://api.mozambiquehe.re/leaderboard?auth=${auth.apexTracker}&legend=Any&platform=PC&key=rankScore`)
}

const playerFiller = (rank: string, playerId: string, points: string) => (
  ` {
    "type": "section",
    "mode": "left",
    "text": {
      "type": "kmarkdown",
      "content": "ID: **${streamerSuperLink(playerId)}** \\n分数: ${points}"
    },
    "accessory": {
      "type": "image",
      "src": "${rankToImage.get(rank)}",
      "size": "lg"
    }
  }`
)


const constructCard = (data: any) => {


  const headerContext = `[
    {
      "type": "card",
      "theme": "none",
      "size": "lg",
      "modules": [`

  const latestUpdate = convertEpochToDate(data.meta.lastUpdate);
  const numberOfPlayers = Number(data.meta.numberOfPlayers);
  const interationNumber = numberOfPlayers > 50 ? 50 : numberOfPlayers

  const tailContext = `]}]`

  let res = '';
  res += headerContext;
  for (let i = 0; i < interationNumber; i++) {
    const playerInfo = data.data[i];
    if (i != 0) res += ',';

    res += playerFiller((i + 1).toString(), playerInfo.name, playerInfo.value)

  }
  res += tailContext;
  return res;
}


export const apexTopForty = new ApexTopForty();
export const apexTopFifty = new ApexTopFifty();