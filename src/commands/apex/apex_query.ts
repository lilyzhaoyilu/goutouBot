import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { normalSendOutCardWrapper } from './helper_methods';

class ApexQuery extends AppCommand {
  code = 'q'; // 只是用作标记
  trigger = 'q'; // 用于触发的文字
  help = '`.apex q 你的origin id`'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    if (session.args.length != 1) {
      return session.quote('输入的指令有误。格式是：.apex q {你的id}，比如 .apex q BestGuda');
    }

    const queryUser = session.args[0];
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getQuery(session, queryUser, msg_id);
    const card: Card = data instanceof Card ? data : buildQueryCard(data);
    addCardTail(card);

    await normalSendOutCardWrapper(session, card, msg_id);
  }
};

const buildQueryCard = (data: any) => {
  const card = new Card().setSize('lg').setTheme('secondary')
  card.addTitle(`${data.global?.name}的数据`)
  GoutouCard.buildPlayerInfoSection(card, data);
  return card;
}

// temprory for promotion
const addCardTail = (card: Card) => {
  card.addModule({
    type: "context", elements: [{
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    },
    {
      "type": "plain-text",
      "content": "新春快乐！如果想查询查主播，看看 .apex s 吧"
    },
    {
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    }]
  })
}

export const apexQuery = new ApexQuery();