import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import { convertEpochToDate } from './apex_utils';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexTime extends AppCommand {
  code = 'time'; // 只是用作标记
  trigger = 'time'; // 用于触发的文字
  help = '发送`.apex time`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      const res = await getCurrentMapRotation();
      const data = res.data;
      return session.sendCard(constructCard(data));
    } catch (err) {
      return session.quote('查询失败, 可能是一个bug, 请私信狗头反馈~')
    }
  };
}

const getCurrentMapRotation = () => {
  return axios.get(`https://api.mozambiquehe.re/maprotation?auth=${auth.apexTracker}&version=2`)
}

const constructCard = (data: any) => {
  return `
  [
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "本赛季赛段时间"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "开始时间：${convertEpochToDate(data.ranked.current.start)}"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "结束时间：${convertEpochToDate(data.ranked.current.end)}"
          }
        }
      ]
    }
  ]`
}


export const apexTime = new ApexTime();