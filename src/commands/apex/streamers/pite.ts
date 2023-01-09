import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { constructLiveCard } from './streamer_utils';

class ApexPite extends AppCommand {
  code = 'pite'; // 只是用作标记
  trigger = 'pite'; // 用于触发的文字
  help = '发送`.apex pite`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const res = await constructLiveCard("5684726", true, "DF_174_o");
    return session.replyCard(res)
  };
}

export const apexPite = new ApexPite();