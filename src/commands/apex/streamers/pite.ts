import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';

class ApexPite extends AppCommand {
  code = 'pite'; // 只是用作标记
  trigger = 'pite'; // 用于触发的文字
  help = '发送`.apex pite`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('Pite', session);
    if (msg_id) {
      return session.updateMessage(msg_id, [card]);
    } else {
      return session.replyCard(card);
    }
  };
}

export const apexPite = new ApexPite();