import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';
import { constructLiveCard } from './streamer_utils';

class Apex3mz extends AppCommand {
  code = '3mz'; // 只是用作标记
  trigger = '3mz'; // 用于触发的文字
  help = '发送`.apex 3mz`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const res = await constructLiveCard("1667826", true, "DF_3Mz_o");
    return session.replyCard(res)
  };
}

export const apex3mz = new Apex3mz();
