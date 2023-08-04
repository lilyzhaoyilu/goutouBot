import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from './helper_methods';

class ApexMapStats extends AppCommand {
  code = 'mapstats'; // 只是用作标记
  trigger = 'mapstats'; // 用于触发的文字
  help = '发送`.apex mapstats`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = buildMapStatsCard();
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

const buildMapStatsCard = () => {
  const card = GoutouCard.baseCard();
  card.addTitle("地图圈概率");
  card.addImage("https://img.kookapp.cn/assets/2023-08/txFwmrdHuU0dw0eb.png");
  card.addTitle("刷圈探测器概率图");
  card.addImage("https://img.kookapp.cn/assets/2023-07/JBPElZfhLq0xc0xc.png");
  card.addImage("https://img.kookapp.cn/assets/2023-07/iZqN6wqqvc0zk11w.jpg");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `紫色代表概率高。颜色优先级是 黄 > 绿 > 青 > 品红 > 橙 > 深蓝 > 淡粉 > 淡黄 > 黄`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `数据源自@1Nurge(Twitter) 感谢[大老师](https://kook.top/AhJPdm) 提供`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `Apex 知识库哪里找？[大老师频道](https://kook.top/AhJPdm) 全都有`
    }
  });
  return card;
}

export const apexMapStats = new ApexMapStats();