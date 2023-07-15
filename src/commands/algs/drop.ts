import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from '../apex/helper_methods';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team, WINNERS, LOSERS } from 'utils/team_assets';
import { constructTeamSection } from './menu';

class AlgsDrop extends AppCommand {
  code = 'd'; // 只是用作标记
  trigger = 'd'; // 用于触发的文字
  help = '发送`.algs d`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCard(), msg_id);
  };
}
export const algsDrop = new AlgsDrop();

const constructCard = () => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle("决赛跳点");

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `如果图片显示不全，请点开查看`
    }
  });
  card.addImage("https://img.kookapp.cn/attachments/2023-07/16/TqHySH7Oog1kw1js.png");
  card.addImage("https://img.kookapp.cn/assets/2023-07/rgE6MdpI4y1kw1js.jpg");
  card.addTitle("败者组第二轮跳点");
  card.addImage("https://img.kookapp.cn/attachments/2023-07/16/ioeA7eO6Ej1kw1js.png");
  card.addImage("https://img.kookapp.cn/assets/2023-07/Tt7y5vhqlU1kw1js.png");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `来自[Sven Twitter](https://twitter.com/SvenAPEX) 感谢大老师提供`
    }
  });
  return card;
}