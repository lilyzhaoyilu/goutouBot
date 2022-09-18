import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';
import { messagerMenu } from './commands/messager/messager_menu';


bot.messageSource.on('message', (e: any) => {
  // Should be comment out in prod
  console.log('New message: ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  console.log(e);
  //

  if (e.channel_type === 'PERSON' && e.extra?.author?.username && e.extra?.author?.bot === false) {
    try {
      // 给频道发消息
      bot.API.message.create(9, '9682242694390929', `:memo: ${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()} || Author_id: ${e.author_id?.toString()}`);

      if (e.extra?.last_msg_content === '[卡片]' && e.author_id) {
        bot.API.directMessage.create(10, e.author_id?.toString(), undefined, INVITE_CONTENT)
      } else if (e.content === '1') {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '2')
      } else {
        bot.API.directMessage.create(10, e.author_id?.toString(), undefined, AUTO_REPLY_CONTENT)
      }
    } catch (err) {
      console.error('Error catched for index.ts: ', err, 'at time: ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    }
  }
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);
bot.addCommands(messagerMenu);

console.error('goutou Bot is connected at ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
bot.connect();

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
      }
    ]
  }
]`