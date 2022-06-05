import { AppCommand, AppFunc, BaseSession } from 'kbotify';

class ApexBest extends AppCommand {
  code = 'best'; // 只是用作标记
  trigger = 'best'; // 用于触发的文字
  help = '发送`.apex best`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const curUserName = session.user.nickname || session.user.username;
    return session.quote(`最厉害的apex玩家是${curUserName}呀୧(๑•̀◡•́๑)૭！`);
  };
}

export const apexBest = new ApexBest();


// class EchoNext2 extends AppCommand {
//   code = 'next';
//   trigger = 'next2';
//   help = '`.echo next2`';
//   intro = '复读用户下次发送的全部文字';
//   func: AppFunc<BaseSession> = async (s) => {
//       const session = s as GuildSession;
//       session.reply('将会复读下一次任意内容');
//       const msg = await session.awaitMessage(/.+/, 1e4);
//       if (msg) {
//           return session.replyTemp(msg.content);
//       } else {
//           return session.replyTemp('没有输入');
//       }
//   };
// }

// const testCard3 = 

// const username = await session.client.API.getUser();