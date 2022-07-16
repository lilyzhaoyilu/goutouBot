import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';


bot.messageSource.on('message', (e) => {
  console.log('New message: ', new Date());
  console.log(e);
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);

bot.connect();