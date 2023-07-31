import { AppCommand, AppFunc, BaseSession, TextMessage } from 'kbotify';

class ApexInvite extends AppCommand {
  code = 'invite'; // 只是用作标记
  trigger = 'invite'; // 用于触发的文字
  help = '发送`.apex invite`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      session.sendCard(constructCard());
    } catch (err) {
      console.error('INVITE CARD session msg: ', session.msg, 'session err: ', err);
    }
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
            "content": "请在**电脑**[点这个二狗邀请链接](https://www.kookapp.cn/app/oauth2/authorize?id=12733&permissions=536870908&client_id=8_4R7kB3Eh6b9GhM&redirect_uri=&scope=bot)。手机不行哦。"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "也可以尝试点击机器人头像，然后点击 **邀请**, 但是可能会出现机器人已经满频道的提示。 如果是这样, 请用上面的链接。"
          }
        }
      ]
    }
  ]`
}

export const apexInvite = new ApexInvite();