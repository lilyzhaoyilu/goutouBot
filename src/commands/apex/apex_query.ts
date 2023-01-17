import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
const axios = require('axios');

class ApexQuery extends AppCommand {
  code = 'q'; // 只是用作标记
  trigger = 'q'; // 用于触发的文字
  help = '`.apex q 你的origin_id`'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    if (session.args.length != 1) {
      return session.quote('输入的指令有误。格式是：.apex q {你的id}，比如 .apex q my_id');
    }

    const queryUser = session.args[0];
    const msgId = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getQuery(session, queryUser, msgId);
    const card: Card = data instanceof Card ? data : buildQueryCard(data);
    if (msgId && data) {
      session.updateMessage(msgId, [card]);
    } else if (data) {
      session.replyCard(card)
    }

  }
};

const buildQueryCard = (data: any) => {
  const card = new Card().setSize('lg').setTheme('secondary')
  card.addTitle(`${data.global.name}的数据`)
  GoutouCard.buildPlayerInfoSection(card, data);
  return card;
}

export const apexQuery = new ApexQuery();