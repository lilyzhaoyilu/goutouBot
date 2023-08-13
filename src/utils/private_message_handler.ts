import { bot } from 'init/client';
import { ErrorHandler } from './error_handler';
import auth from '../configs/auth';
import { Card } from "kbotify";
import { SILVRE_NESSIE } from './assets';

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

        // 发送邀请卡片
        if (e.extra?.last_msg_content === '[卡片]' && e.author_id) {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, INVITE_CONTENT)
          // 发送数字1
        } else if (e.content === '1') {
          await bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '2')
          // 发送一些常见关键字
        } else if (e.content === '你好') {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, NO_HELLO());

        } else if (e.content.search(/apex/i) !== -1 || e.content.search("冲猎") !== -1 || e.content.search("查询") !== -1 || e.content.search("猎杀") !== -1) {
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, USAGE_ONLY_CONTENT)
        } else {
          // 其他自动回复
          await bot.API.directMessage.create(10, e.author_id?.toString(), undefined, AUTO_REPLY_CONTENT)
        }
      } catch (err) {
        bot.API.message.create(9, '9682242694390929', `:fire: ERROR: ${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()} || Author_id: ${e.author_id?.toString()}`);
      }
    }
  }
}

const PROFILE_THREE_M_Z = "https://img.kookapp.cn/assets/2023-07/SRaf8RWsZI05k05k.jpg";
const PROFILE_QQ = "https://img.kookapp.cn/assets/2023-07/9pYPTyZcLh04w04w.jpg";

const NO_HELLO = () => {
  const card = new Card().setColor('#b2e9b0').setSize('lg');
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `:cross_mark_button:**请不要这样做**`
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**QQ** 5:15 下午\n你好`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_QQ,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**3MZ** 6:15 下午\n...?`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_THREE_M_Z,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**QQ** 6:16 下午\n要一起打游戏吗?`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_QQ,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**3MZ** 7:20 下午\n哦, 我已经要下了!`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_THREE_M_Z,
      "size": "sm"
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `请注意, 这里时间已经过去了两个小时! 其实QQ可以不让3mz等待, 而3mz收到信息后也可以立刻开始和QQ一起玩。\n现在已经是2023年啦, 聊天方式也和以前不同。尽管你的初衷是好的, 但实际上只说你好只是在让对方等待.\n**请直接问问题! **:angry:`
    }
  });
  card.addDivider();
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `:ballot_box_with_check:**请试着这样做**`
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**QQ** 5:15 下午\n你好, 要一起打游戏吗?`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_QQ,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**3MZ** 6:15 下午\n你好, 好的呀!`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_THREE_M_Z,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**QQ** 6:16 下午\nKook见!`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_QQ,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**3MZ** 6:16 下午\n好的!`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_THREE_M_Z,
      "size": "sm"
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `如果你觉得直接说事情有些唐突, 你可以适当的在你的消息前加上一些问候的话。这样在对方看到你的消息的时候, 他们可以立刻回复你想要的内容, 而不是盯着你好迷茫不解。:partying_face:`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `借鉴 [no-hello](https://nohello.net/zh-cn/)。 如果对话的头像和人物让你感到不开心, 请私信狗头, 狗头会尽快更换。`
    }
  });
  return card.toString();
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
          "content": "开发者已经收到你的信息。提出被采纳的bug, 狗头会给你发小红包的哦~"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "点击看[邀请教程](https://www.bilibili.com/video/BV1Eg41127y3?p=1)"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "点击看[使用教程](https://www.bilibili.com/video/BV1Eg41127y3?p=2)"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "点击看[设置狗头机器人权限教程](https://www.bilibili.com/video/BV1Eg41127y3?p=3). 设置权限之后, 机器人只能在一个频道回复. "
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "也可以加入狗头的频道, 试用狗头或者提出使用问题~"
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