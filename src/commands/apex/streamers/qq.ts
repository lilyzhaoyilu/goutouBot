import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { Streamer } from 'utils/streamer_handler';
import { normalSendOutCardWrapper } from '../helper_methods';

class ApexQq extends AppCommand {
  code = 'qq'; // 只是用作标记
  trigger = 'qq'; // 用于触发的文字
  help = '发送`.apex qq`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const card = await Streamer.assembleStreamerCard('qq', session);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

export const apexQq = new ApexQq();