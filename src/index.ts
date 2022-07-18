import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';


bot.messageSource.on('message', (e: any) => {
  // Should be comment out in prod
  console.log('New message: ', new Date());
  console.log(e);
  //

  if (e.channel_type === 'PERSON' && e.extra?.author?.username) {
    try {
      bot.API.message.create(9, '9682242694390929', `${e.extra?.author?.username}#${e.extra?.author?.identify_num} says ${e.content.toString()}`);
    } catch (err) {
      console.log('Error catched for index.ts: ', err);
    }
  }
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);

bot.connect();