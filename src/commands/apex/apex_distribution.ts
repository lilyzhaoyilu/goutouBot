import { data } from 'cheerio/lib/api/attributes';
import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { StringTranslation } from 'utils/string_translation';
import { normalSendOutCardWrapper, addTailTempMessage } from './helper_methods';

class ApexDistribution extends AppCommand {
  code = 'distribution'; // 只是用作标记
  trigger = 'd'; // 用于触发的文字
  help = '发送`.apex d`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const br_data = await ApexLegendsStatus.getBrDistribution(session);
    // const ar_data = await ApexLegendsStatus.getAr(session);
    const card: Card = br_data instanceof Card ? br_data : buildDistributionCard(br_data);
    addTailTempMessage(card);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

export const apexDistribution = new ApexDistribution();

const buildDistributionCard = (br_data: any, ar_data: any = '') => {
  const card = new Card().setColor('#b2e9b0').setSize('lg').addTitle("全平台大逃杀玩家段位分布(含未定级玩家)");
  parseSectionData(card, br_data);

  card.addModule({
    type: "context", elements: [{
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    },
    {
      "type": "plain-text",
      "content": "数据由 apexlegendsstatus.com提供, 和重生数据有差别。"
    },
    {
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    }]
  })

  card.addModule({
    type: "context", elements: [{
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    },
    {
      "type": "plain-text",
      "content": "如果有其他的意见和问题，可以直接私信狗头机器人~"
    },
    {
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
    }]
  })
  return card;
}

const parseSectionData = (card: Card, data: any) => {
  let cur_rank = 'Apex Predator';
  let cur_percentage = 0;
  // let cur_total_count = 0;
  for (let i = data.length - 1; i >= 1; i--) {
    const name = data[i].name;
    const percentage = data[i].data[i - 1];
    // const total_count = data[i].totalCount;
    const rank = name.split(' ')[0] === 'Apex' ? 'Apex Predator' : name.split(' ')[0];
    if (cur_rank !== rank) {
      const content = `${StringTranslation.translateRanking(cur_rank)} **${cur_percentage}%**`;
      buildDistributionSection(card, content);

      cur_rank = rank
      cur_percentage = percentage;
      // cur_total_count = total_count;
    } else {
      cur_percentage += percentage;
      // cur_total_count += total_count;
    }
  }
  const content = `${StringTranslation.translateRanking(cur_rank)} **${cur_percentage}%**`;
  buildDistributionSection(card, content);
}


const buildDistributionSection = (card: Card, content: string) => {
  card.addModule(
    {
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `${content}`
      }
    }
  )

}