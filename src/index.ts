import { bot } from 'init/client';
import { echoMenu } from './commands/echo/echo.menu';
import { apexMenu } from './commands/apex/apex_menu';
import { messagerMenu } from './commands/messager/messager_menu';
import { PrivateMessage } from 'utils/private_message_handler';
import { apexInvite } from 'commands/apex/apex_invite';
import { apexPredator } from 'commands/apex/apex_predator';
import { apexQuery } from 'commands/apex/apex_query';
import { apexMap } from 'commands/apex/apex_map';
import { apexCraft } from 'commands/apex/apex_craft';
import { apexTopTen, apexTopFifty } from 'commands/apex/apex_leaderboard';
import { apexTime } from 'commands/apex/apex_time';
import { apexStreamers } from 'commands/apex/apex_streamers';
import { apexPickRates, apexPickRatesMaster, apexPickRatesDiamond, apexPickRatesPlatinum } from 'commands/apex/apex_pick_rates';
import { apexDistribution } from 'commands/apex/apex_distribution';

import { apexJacky } from 'commands/apex/streamers/jacky';
import { apex3mz } from 'commands/apex/streamers/3mz';
import { apexPite } from 'commands/apex/streamers/pite';
import { apexRoieee } from 'commands/apex/streamers/roieee';
import { apexKuku } from 'commands/apex/streamers/kuku';
import { apexQq } from 'commands/apex/streamers/qq';
import dotenv from "dotenv";
import { apexFeiju } from 'commands/apex/streamers/feiju';
import { apexLaodiao } from 'commands/apex/streamers/laodiao';
import { apexLizhi } from 'commands/apex/streamers/lizhi';
import { apexTianyao } from 'commands/apex/streamers/tianyao';
import { apexYouling } from 'commands/apex/streamers/youling';
import { apexKasha } from 'commands/apex/streamers/kasha';
import { apexMingyue } from 'commands/apex/streamers/mingyue';
import { apexXiaore } from 'commands/apex/streamers/xiaore';

import { algsMenu } from 'commands/algs/menu';
import { groupA, groupB, groupC, groupD, groupLosers, groupWinners } from 'commands/algs/groups';
import { algsResults } from 'commands/algs/results';
import { algsSchedule } from 'commands/algs/schedule';
import { algsPlayerData } from 'commands/algs/player_data';
dotenv.config();

bot.messageSource.on('message', (e: any) => {
  if (process.env.ENV === "test") {
    console.log(e);
  }
  PrivateMessage.privateMessage(e);
});

bot.addCommands(algsMenu);
bot.addAlias(algsMenu, "比赛");
bot.addAlias(algsResults, "积分");
bot.addAlias(algsSchedule, "赛程", "日程");
bot.addAlias(algsPlayerData, "选手");
bot.addAlias(groupLosers, "败者组", "败者");
bot.addAlias(groupWinners, "胜者组", "胜者");
algsMenu.addAlias(groupA, "A", "A组");
algsMenu.addAlias(groupB, "B", "B组");
algsMenu.addAlias(groupC, "C", "C组");
algsMenu.addAlias(groupD, "D", "D组");

bot.addCommands(echoMenu);
bot.addAlias(echoMenu, "在吗");

// apex
bot.addCommands(apexMenu);
bot.addAlias(apexMenu, "帮助");
bot.addAlias(apexPredator, "冲猎", "猎杀");
bot.addAlias(apexQuery, "查询", "查");
bot.addAlias(apexInvite, "邀请");
bot.addAlias(apexTime, "赛季", "时间");
bot.addAlias(apexMap, "地图", "图");
bot.addAlias(apexCraft, "制造", "造");
bot.addAlias(apexTopTen, "前十");
bot.addAlias(apexTopFifty, "前五十", "五十");
bot.addAlias(apexPickRates, "选择率", "选择");
bot.addAlias(apexPickRatesMaster, "猎杀选择率", "大师选择率", "猎杀选择", "大师选择");
bot.addAlias(apexPickRatesDiamond, "钻石选择率", "钻石选择");
bot.addAlias(apexPickRatesPlatinum, "铂金选择率", "白金选择率", "铂金选择", "白金选择");

apexMenu.addAlias(apexStreamers, "主播");
bot.addAlias(apexStreamers, "主播");
bot.addAlias(apexDistribution, "分布");

apexMenu.addAlias(apexTopFifty, "top");

// apex streamers
apexMenu.addAlias(apex3mz, "三明治", "王虎仙贝", "高冷仙贝", "whxb", "xbwh", "王虎", "3Mz", "3MZ");
apexMenu.addAlias(apexPite, "皮特", "皮将军", "pite174", "ptxb", "xbpt");
apexMenu.addAlias(apexRoieee, "百弟", "Roieee", "百神", "陈柏瀚");
apexMenu.addAlias(apexJacky, "Jacky", "佛山第一密客");
apexMenu.addAlias(apexKuku, "Kuku", "小浣熊", "浣熊");
apexMenu.addAlias(apexQq, "QQ", "Qq");
apexMenu.addAlias(apexFeiju, "Feiju", "飞天狙", "飞狙", "狙狙公主", "老馋", "狙神", "郭0俊", "百年难得一遇的天才完美的123号位");
apexMenu.addAlias(apexLaodiao, "Laodiao", "老吊", "老吊QuQ");
apexMenu.addAlias(apexLizhi, "Lizhi", "荔枝", "daidaizhi");
apexMenu.addAlias(apexTianyao, "Tianyao", "甜药");
apexMenu.addAlias(apexYouling, "Youling", "幽灵");
apexMenu.addAlias(apexKasha, "Kasha", "卡莎");
apexMenu.addAlias(apexMingyue, "Mingyue", "明月", "五更明月");
apexMenu.addAlias(apexXiaore, "Xiaore", "小惹");
// messager
bot.addCommands(messagerMenu);


console.log('goutou Bot is connected at ', new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
bot.connect();