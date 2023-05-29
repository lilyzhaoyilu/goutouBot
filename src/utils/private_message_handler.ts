import { bot } from 'init/client';
import { ErrorHandler } from './error_handler';
import auth from '../configs/auth';


export class PrivateMessage {
  static async privateMessage(e: any) {

    if (e.extra?.author?.bot === false && !e.extra?.author?.is_sys && e.content && e.content.includes(`(met)${auth.SELF_ID}(met)`)) {
      // ErrorHandler.forwardAtMessageToChatChannel(e); Disable forwarding because it's mostly noise.
      try {
        bot.API.message.create(9, e.target_id?.toString(), "如果想使用机器人，请发送.apex \n如果有使用问题请点机器人头像 -> 私信。私信的自动回复有教程视频~\n", e.msg_id?.toString());
      } catch (err) {
        bot.API.message.create(9, '9682242694390929', `:fire: ERROR: ${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()} || Author_id: ${e.author_id?.toString()}`);
      }
    }

    if (e.channel_type === 'PERSON' && e.extra?.author?.username && e.extra?.author?.bot === false) {
      try {
        // 给频道发消息
        ErrorHandler.sendChatMessageToChatChannel(e);

        if (e.extra?.last_msg_content === '[卡片]' && e.author_id) {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, INVITE_CONTENT)
        } else if (e.content === '1') {
          await bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '2')
        } else if (e.content.search(/apex/i) !== -1 || e.content.search("冲猎") !== -1 || e.content.search("查询") !== -1 || e.content.search("猎杀") !== -1) {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, USAGE_ONLY_CONTENT)
        } else {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, AUTO_REPLY_CONTENT)
        }
      } catch (err) {
        bot.API.message.create(9, '9682242694390929', `:fire: ERROR: ${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()} || Author_id: ${e.author_id?.toString()}`);
      }
    }
  }
}


const INVITE_CONTENT = `[
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
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "需要更多帮助可以[点这里看邀请视频](https://www.bilibili.com/video/BV1Eg41127y3?p=1)。"
        }
      }
    ]
  }
]`


const USAGE_ONLY_CONTENT = `[
  {
    "type": "card",
    "theme": "secondary",
    "size": "lg",
    "modules": [
      {
        "type": "header",
        "text": {
          "type": "plain-text",
          "content": "使用狗头机器人"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "请在有狗头的频道**公屏**发送\`.apex\`查看机器人菜单。"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "不知道怎么用？[点这里看使用视频](https://www.bilibili.com/video/BV1Eg41127y3?p=2)。"
        }
      }
    ]
  }
]`


const AUTO_REPLY_CONTENT = `[
  {
    "type": "card",
    "theme": "secondary",
    "size": "lg",
    "modules": [
      {
        "type": "header",
        "text": {
          "type": "plain-text",
          "content": "使用狗头机器人"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "请在有狗头的频道**公屏**发送\`.apex\`查看机器人菜单。"
        }
      },
      {
        "type": "divider"
      },
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
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "需要更多帮助可以[点这里看邀请视频](https://www.bilibili.com/video/BV1Eg41127y3?p=1)。"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "header",
        "text": {
          "type": "plain-text",
          "content": "需要反馈使用过程中遇到的问题或者建议"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "开发者已经收到你的信息。提出被采纳的bug，狗头会给你发小红包的哦~"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "不知道怎么用？[点这里看使用视频](https://www.bilibili.com/video/BV1Eg41127y3?p=2)。"
        }
      },
      {
        "type": "header",
        "text": {
          "type": "plain-text",
          "content": "加入Apex查询狗头的频道"
        }
      },
      {
        "type": "invite",
        "code": "8nnMWN"
      }
    ]
  }
]`