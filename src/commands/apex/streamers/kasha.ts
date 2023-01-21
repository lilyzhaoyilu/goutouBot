import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';

class ApexKasha extends AppCommand {
  code = 'kasha'; // 只是用作标记
  trigger = 'kasha'; // 用于触发的文字
  help = '发送`.apex kasha`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    // TODO: add Huya api
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('Kasha', session);
    if (msg_id) {
      return session.updateMessage(msg_id, [card]);
    } else {
      return session.replyCard(card);
    }
  };
}

export const apexKasha = new ApexKasha();
