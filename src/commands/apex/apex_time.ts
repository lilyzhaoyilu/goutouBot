import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { StringTranslation } from 'utils/string_translation';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from './helper_methods';

class ApexTime extends AppCommand {
  code = 'time'; // 只是用作标记
  trigger = 'time'; // 用于触发的文字
  help = '发送`.apex time`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getSeasonTimeInfo(session);
    const card: Card = data instanceof Card ? data : buildTimeCard(data);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

const buildTimeCard = (data: any) => {
  return new Card(
    {
      type: "card",
      theme: "secondary",
      size: "lg",
      modules: [
        {
          type: "header",
          text: {
            type: "plain-text",
            content: `${data.info.ID} 赛季时间`
          }
        },
        {
          type: "section",
          text: {
            type: "kmarkdown",
            content: `上半赛季开始时间：${StringTranslation.convertEpochToDate(data.dates
              .Start)}`
          }
        },
        {
          type: "section",
          text: {
            type: "kmarkdown",
            content: `下半赛季开始时间：${StringTranslation.convertEpochToDate(data.dates
              .Split)}`
          }
        },
        {
          type: "section",
          text: {
            type: "kmarkdown",
            content: `结束时间：${StringTranslation.convertEpochToDate(data.dates
              .End)}`
          }
        }
      ]
    }
  )
}

export const apexTime = new ApexTime();