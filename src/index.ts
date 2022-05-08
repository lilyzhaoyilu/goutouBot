import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';
import { apexCommand } from './commands/apex/apex_command';


bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

bot.addCommands(apexMenu);
bot.addCommands(apexCommand);

bot.connect();
