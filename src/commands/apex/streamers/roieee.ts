import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';

class ApexRoieee extends AppCommand {
  code = 'roieee'; // 只是用作标记
  trigger = 'roieee'; // 用于触发的文字
  help = '发送`.apex roieee`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('Roieee', session);
    if (msg_id) {
      return session.updateMessage(msg_id, [card]);
    } else {
      return session.replyCard(card);
    }
  };
}

export const apexRoieee = new ApexRoieee();