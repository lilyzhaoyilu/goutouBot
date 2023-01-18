import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';

class MessagerSend extends AppCommand {
  code = 'send'; // 只是用作标记
  // For goutou1, send2 for goutou2
  trigger = auth.VERSION; // 用于触发的文字
  help = '.msg send receiverId content'; // 帮助文字
  intro = 'for test';
  func: AppFunc<BaseSession> = async (session) => {

    const receiverId = session.args[0];
    const content = session.args[1];

    if (session.user?.id == auth.devUserId) {
      if (!receiverId || !content) {
        return session.quote(`Missing an argument.`)
      }

      try {
        session.client.API.directMessage.create(9, receiverId, undefined, content);
      } catch (e: any) {
        return session.quote(`There is an error: `, e);
      }

      return session.quote(`Send ${receiverId}
      ${content}`);
    }

    return session.quote(`Authentication failed.`);

  }
};

export const messagerSend = new MessagerSend();