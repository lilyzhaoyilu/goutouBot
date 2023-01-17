import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';

class Apex3mz extends AppCommand {
  code = '3mz'; // 只是用作标记
  trigger = '3mz'; // 用于触发的文字
  help = '发送`.apex 3mz`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {

    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('3mz', session);
    if (msg_id) {
      return session.updateMessage(msg_id, [card]);
    } else {
      return session.replyCard(card);
    }
  };
}

export const apex3mz = new Apex3mz();
