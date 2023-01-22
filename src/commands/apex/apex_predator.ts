import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';

class ApexPredator extends AppCommand {
  code = 'p'; // 只是用作标记
  trigger = 'p'; // 用于触发的文字
  help = '`.apex p` 来查询现在需要达到猎杀的分数'; // 帮助文字
  intro = '`.apex p` 来查询现在需要达到猎杀的分数';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getReachPredatorOnPC(session);
    if (msg_id && data) {
      return session.updateMessage(msg_id, [buildReachPredatorCard(data)]);
    } else if (data) {
      return session.replyCard(buildReachPredatorCard(data));
    }
  };
}

const buildReachPredatorCard = (data: any) => {
  const card = new Card().setSize('lg').setTheme('secondary');
  card.addTitle("猎杀分数线 (PC端)");
  buildReachPredatorBrSection(card, data);
  buildReachPredatorArSection(card, data);
  card.addModule({
    "type": "context",
    "elements": [{
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    },
    {
      "type": "plain-text",
      "content": "新赛季数据库需要一定时间收集玩家信息。"
    },
    {
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
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
          content: `**当前猎杀最低排名** \n${data.RP.PC.foundRank}`
        },
        {
          type: "kmarkdown",
          content: `**当前猎杀最低分数** \n${data.RP.PC.val}`
        },
        {
          type: "kmarkdown",
          content: `**当前大师及猎杀人数** \n${data.RP.PC.totalMastersAndPreds}`
        }
      ]
    }
  })
}


const buildReachPredatorArSection = (card: Card, data: any) => {
  card.addDivider();
  card.addTitle('竞技场')
  card.addModule({
    type: "section",
    text: {
      type: "paragraph",
      cols: 3,
      fields: [
        {
          type: "kmarkdown",
          content: `**当前猎杀最低排名** \n${data.AP.PC.foundRank}`
        },
        {
          type: "kmarkdown",
          content: `**当前猎杀最低分数** \n${data.AP.PC.val}`
        },
        {
          type: "kmarkdown",
          content: `**当前大师及猎杀人数** \n${data.AP.PC.totalMastersAndPreds} `
        }
      ]
    }
  })
}

export const apexPredator = new ApexPredator();