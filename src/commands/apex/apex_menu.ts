import { Card, MenuCommand, BaseUser } from 'kbotify';
import { apexQuery } from './apex_query';
import { apexPredator } from './apex_predator';
import { apexMap } from './apex_map';
import { apexCraft } from './apex_craft';
import { apexTopTen, apexTopFifty } from './apex_leaderboard';
import { apexInvite } from './apex_invite';
import { apexTime } from './apex_time';
import { apexPickRates, apexPickRatesDiamond, apexPickRatesMaster, apexPickRatesPlatinum } from './apex_pick_rates';
import { apexDistribution } from './apex_distribution';
import { YELLOW_NESSIE, PROFILE_NESSIE, SILVRE_NESSIE, RED_NESSIE, APEX_LOGO_RED } from 'utils/assets';

// streamers related
import { apexStreamers } from './apex_streamers';
import { apexPite } from './streamers/pite';
import { apex3mz } from './streamers/3mz';
import { apexRoieee } from './streamers/roieee';
import { apexJacky } from './streamers/jacky';
import { apexKuku } from './streamers/kuku';
import { apexQq } from './streamers/qq';
import { apexFeiju } from './streamers/feiju';
import { apexLaodiao } from './streamers/laodiao';
import { apexLizhi } from './streamers/lizhi';
import { apexTianyao } from './streamers/tianyao';
import { apexYouling } from './streamers/youling';
import { apexEnzuo } from './streamers/enzuo';
// huya
import { apexKasha } from './streamers/kasha';
import { apexMingyue } from './streamers/mingyue';
import { apexNiko } from './streamers/niko';
// douyin
import { apexXiaore } from './streamers/xiaore';

class ApexMenu extends MenuCommand {
  code = 'apex';
  trigger = 'apex';
  help = '这是apex指令的菜单';
  intro = '输入.apex 查看指令帮助';
  menu = contructMenu();
  useTempMenu = false;
  useCardMenu = true; // 使用卡片菜单
};

const contructMenu = () => {
  const card = new Card().setSize('lg').setTheme('secondary');
  card.addTitle("Apex查询狗头指令菜单");

  card.addDivider();
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**玩家数据查询**`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": YELLOW_NESSIE,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `\` 。查询 橘子id\`或 \`.apex q 橘子id\` 查询账户状态和排位分数。橘子id只能是英文的, 比如\`.apex q BestGuda\``
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。前十\`或\`.apex top10\`查询现在PC端大逃杀榜单前10"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。前五十\`或\`.apex top50\`查询现在PC端大逃杀榜单前50"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。选择率\`或\`.apex r\`(**r**ates)查询英雄选择率"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。分布\`或\`.apex d\`(**d**istribution)查询现在的玩家段位分布"
    }
  });

  card.addDivider();
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**游戏数据查询**`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": SILVRE_NESSIE,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。冲猎\`或\`.apex p\`(**p**radetor)查询现在达到猎杀的分数"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。时间\`或\`.apex time\`查询这个赛季的开始和结束时间"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。地图\`或\`.apex map\`查询现在的地图"
    }
  });
  // Deprecated
  // card.addModule({
  //   type: "section", text: {
  //     "type": "kmarkdown",
  //     "content": "\`。制造\`或\`.apex c\`(**c**raft)查询现在复制器可以制造的东西"
  //   }
  // });

  card.addDivider();
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**主播相关查询**`
    }, mode: "left",
    accessory: {
      "type": "image",
      "src": RED_NESSIE,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。主播\`或\`.apex s\`(**s**treamers)查看一些主播的直播间和账号信息, 比如三明治用\`.apex 3mz\`"
    }
  });

  card.addDivider();
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**Apex Legends Global Series (ALGS) 比赛相关**`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": APEX_LOGO_RED,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。比赛\`或\`.algs\` 查询ALGS比赛相关信息~ DF和MDY-WHITE 加油！"
    }
  });

  card.addDivider();
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `**机器人相关**`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": PROFILE_NESSIE,
      "size": "sm"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`。邀请\`或\`.apex invite\`获取邀请狗头去自己服务器的方法。如果需要帮助视频, 可以私信狗头查看自动回复中的链接。"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "\`.\` 也可以替换成 \`。\`"
    }
  });
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": "如果想要更多功能或者发现了bug~请私信狗头~狗头有小红包哦~ :wink:"
    }
  });
  return [card];
}

// card.addModule({
//   type: "section", text: {
//     "type": "kmarkdown",
//     "content": `"\`.apex q 橘子id\`或\` 。查询 橘子id\` 查询账户状态和排位分数。橘子id只能是英文的, 比如\`.apex q BestGuda\`"`
//   },
//   mode: "right",
//   accessory: {
//     "type": "button",
//     "theme": "primary",
//     "click": "return-val",
//     "value": "查询宝贝",
//     "text": {
//       "type": "plain-text",
//       "content": "完全同意"
//     }
//   }
// });



export const apexMenu = new ApexMenu(apexQuery, apexPredator, apexMap, apexCraft, apexTopTen, apexInvite, apexTime, apexTopFifty, apexPickRates, apexPickRatesMaster, apexPickRatesDiamond, apexPickRatesPlatinum, apexDistribution, apexPite, apexStreamers, apex3mz, apexRoieee, apexJacky, apexKuku, apexQq, apexFeiju, apexLaodiao, apexLizhi, apexTianyao, apexYouling, apexKasha, apexMingyue, apexNiko, apexXiaore, apexEnzuo);