import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';
import { messagerMenu } from './commands/messager/messager_menu';
import { apex3mz } from 'commands/apex/streamers/3mz';
import { apexPite } from 'commands/apex/streamers/pite';
import { apexRoieee } from 'commands/apex/streamers/roieee';
import { PrivateMessage } from 'utils/private_message_handler';
import { apexInvite } from 'commands/apex/apex_invite';
import { apexPredator } from 'commands/apex/apex_predator';
import { apexQuery } from 'commands/apex/apex_query';
import { apexMap } from 'commands/apex/apex_map';
import { apexCraft } from 'commands/apex/apex_craft';
import { apexTopTen, apexTopFifty } from 'commands/apex/apex_leaderboard';
import { apexTime } from 'commands/apex/apex_time';
import dotenv from "dotenv";
dotenv.config();

bot.messageSource.on('message', (e: any) => {
  if (process.env.ENV === "test") {
    console.log(e);
  }
  PrivateMessage.privateMessage(e);
});

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

// apex
bot.addCommands(apexMenu);
bot.addAlias(apexPredator, "冲猎", "猎杀");
bot.addAlias(apexQuery, "查询", "查");
bot.addAlias(apexInvite, "邀请");
bot.addAlias(apexTime, "赛季", "时间");
bot.addAlias(apexMap, "地图", "图");
bot.addAlias(apexCraft, "制造", "造");
bot.addAlias(apexTopTen, "前十");
bot.addAlias(apexTopFifty, "前五十", "五十");

// apex streamers
apexMenu.addAlias(apex3mz, "三明治", "王虎仙贝", "高冷仙贝", "whxb", "xbwh", "王虎", "3Mz", "3MZ");
apexMenu.addAlias(apexPite, "皮特", "皮将军", "pite174", "ptxb", "xbpt");
apexMenu.addAlias(apexRoieee, "百弟", "Roieee", "百神", "陈柏瀚");

// messager
bot.addCommands(messagerMenu);


console.log('goutou Bot is connected at ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
bot.connect();