import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { PROFILE_NESSIE } from '../../utils/assets';
import { normalSendOutCardWrapper } from './helper_methods';
import { logger } from '../../utils/logger';

class ApexPredator extends AppCommand {
  code = 'p'; // 只是用作标记
  trigger = 'p'; // 用于触发的文字
  help = '`.apex p` 来查询现在需要达到猎杀的分数'; // 帮助文字
  intro = '`.apex p` 来查询现在需要达到猎杀的分数';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getReachPredatorOnPC(session);
    if (msg_id && data) {
      try {
        session.updateMessage(msg_id, [buildReachPredatorCard(data)]);
      }
      catch (err) {
        console.error('UPDATE CARD session msg: ', session.msg, 'session err: ', err);
      }
    } else if (data) {
      try {
        session.replyCard(buildReachPredatorCard(data));
      } catch (err) {
        console.error('REPLY CARD session msg: ', session.msg, 'session err: ', err);
      }
    }
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'predatorScore');
  };
}

const buildReachPredatorCard = (data: any) => {
  const card = GoutouCard.baseCard();
  card.addTitle("猎杀分数线 (PC端)");
  buildReachPredatorBrSection(card, data);
  card.addModule({
    "type": "context",
    "elements": [{
      "type": "image",
      "src": PROFILE_NESSIE
    },
    {
      "type": "plain-text",
      "content": "新赛季数据库需要一定时间收集玩家信息。"
    },
    {
      "type": "image",
      "src": PROFILE_NESSIE
    }
    ]
  });
  return card;
}

const buildReachPredatorBrSection = (card: Card, data: any) => {
  card.addDivider();
  card.addTitle('大逃杀')
  card.addModule({
    type: "section",
    text: {
      type: "paragraph",
      cols: 3,
      fields: [
        {
          type: "kmarkdown",
          content: `**当前猎杀最低排名** \n${data.RP?.PC?.foundRank}`
        },
        {
          type: "kmarkdown",
          content: `**当前猎杀最低分数** \n${data.RP?.PC?.val}`
        },
        {
          type: "kmarkdown",
          content: `**当前大师及猎杀人数** \n${data.RP?.PC?.totalMastersAndPreds}`
        }
      ]
    }
  })
}

export const apexPredator = new ApexPredator();