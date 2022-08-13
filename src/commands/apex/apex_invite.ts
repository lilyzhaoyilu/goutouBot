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
            "content": "邀请Apex查询狗头进入自己的服务器"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "用**电脑**直接戳[邀请链接](https://www.kaiheila.cn/app/oauth2/authorize?id=11038&permissions=268435455&client_id=dZ69aXhULKhX5krk&redirect_uri=&scope=bot)。这个链接可能打开比较慢，需要等一下..."
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "你需要是邀请服务器的管理者。手机端暂时不能邀请机器人。"
          }
        }
      ]
    }
  ]`
}

export const apexInvite = new ApexInvite();