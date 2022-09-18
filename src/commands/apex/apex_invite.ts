import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';

class ApexInvite extends AppCommand {
  code = 'invite'; // 只是用作标记
  trigger = 'invite'; // 用于触发的文字
  help = '发送`.apex invite`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    return session.sendCard(constructCard());
  };
}

const constructCard = () => {
  return `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "邀请狗头进入你的频道"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "请在**电脑**[点这个二狗邀请链接](https://www.kaiheila.cn/app/oauth2/authorize?id=12733&permissions=536870911&client_id=8_4R7kB3Eh6b9GhM&redirect_uri=&scope=bot)。手机不行哦。"
          }
        }
      ]
    }
  ]`
}

export const apexInvite = new ApexInvite();