import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';


bot.messageSource.on('message', (e: any) => {
  // Should be comment out in prod
  console.log('New message: ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  console.log(e);
  //

  if (e.channel_type === 'PERSON' && e.extra?.author?.username) {
    try {
      bot.API.message.create(9, '9682242694390929', `:memo: ${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()}. Author_id: ${e.author_id?.toString()}`);

      if (e.extra?.last_msg_content === '[卡片]' && e.author_id) {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '如果想要邀请狗头去你的服务器，请用.apex invite 查看邀请方法。')
      } else {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '狗头已经收到了消息，作者在线了就会回复。作者在线的时间一般是工作日的早上和周末的凌晨-下午。')
      }
    } catch (err) {
      console.error('Error catched for index.ts: ', err, 'at time: ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    }
  }
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);
console.log('goutou Bot is connected at ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
bot.connect();