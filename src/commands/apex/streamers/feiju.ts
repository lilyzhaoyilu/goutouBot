import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';
import { normalSendOutCardWrapper } from '../helper_methods';

class ApexFeiju extends AppCommand {
  code = 'feiju'; // 只是用作标记
  trigger = 'feiju'; // 用于触发的文字
  help = '发送`.apex feiju`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('Feiju', session);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

export const apexFeiju = new ApexFeiju();
