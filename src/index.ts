import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';


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
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '用**电脑**直接戳[邀请链接](https://www.kaiheila.cn/app/oauth2/authorize?id=11038&permissions=268435455&client_id=dZ69aXhULKhX5krk&redirect_uri=&scope=bot)。手机端暂时不能邀请机器人。需要你拥有邀请服务器的管理权限。如果需要帮助请看[帮助视频](https://www.bilibili.com/video/bv1pd4y1976L)')
      } else if (e.content === '1') {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '2')
      } else if (e.content.includes('apex')) {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '你好，请在有狗头机器人的频道里发送 .apex 查看狗头机器人的菜单。暂时不支持私信查询。如果有什么问题可以私信。如果需要帮助请看[帮助视频](https://www.bilibili.com/video/bv1pd4y1976L)')
      } else {
        bot.API.directMessage.create(9, e.author_id?.toString(), undefined, '狗头已经收到了消息，作者在线了就会回复。作者在线的时间一般是工作日的早上和周末的凌晨-下午。  可以在有狗头机器人的频道里发送 .apex 查看狗头机器人的菜单。暂时不支持私信查询。如果需要帮助请看[帮助视频](https://www.bilibili.com/video/bv1pd4y1976L)')
      }
    } catch (err) {
      console.error('Error catched for index.ts: ', err, 'at time: ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    }
  }
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);
console.error('goutou Bot is connected at ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
bot.connect();