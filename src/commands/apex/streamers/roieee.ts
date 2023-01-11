import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { constructLiveCard } from './streamer_utils';

class ApexRoieee extends AppCommand {
  code = 'roieee'; // 只是用作标记
  trigger = 'roieee'; // 用于触发的文字
  help = '发送`.apex roieee`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const res = await constructLiveCard("10722927", true, "DF_Roieee_o");
    return session.replyCard(res)
  };
}

export const apexRoieee = new ApexRoieee();