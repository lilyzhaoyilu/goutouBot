import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexQuery extends AppCommand {
  code = 'q'; // 只是用作标记
  trigger = 'q'; // 用于触发的文字
  help = '`.apex q 你的origin_id`'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    if (session.args.length != 1) {
      return session.quote('输入的指令有误。格式是：.apex q {你的id}，比如 .apex q my_id');
    }

    const curUser = session.user.username;
    const queryUser = session.args[0];
    try {
      const res = await getApexAccountStatus(queryUser);
      const data = res.data;
      return session.sendCard(constructCard(curUser, data));
    } catch (err) {
      return session.quote('查询失败, 暂时只支持查询origin id。如果同时查询次数过多, 可以等一会再查询。如果你觉得这是一个bug, 请向开发者反馈。');
    }
  };
}

const getApexAccountStatus = async (queryUser: string) => {
  return axios.get(`https://api.mozambiquehe.re/bridge?auth=${auth.apexTracker}&player=${queryUser}&platform=PC`);
}

const translateRanking = (rank: string) => {
  switch (rank) {
    case 'Master':
      return '大师';
      break;
    case 'Diamond':
      return '钻石';
      break;
    case 'Platinum':
      return '铂金';
      break;
    case 'Gold':
      return '黄金';
      break;
    case 'Silver':
      return '白银';
      break;
    case 'Bronze':
      return '青铜';
      break;
    case 'Unranked':
      return '未定级';
      break;
    default:
      return rank
  }
}

const constructCard = (curUser: string, data: any) => (
  `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "${curUser}的查询结果"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**游戏等级**\n ${data.global.level}" 
              },
              {
                "type": "kmarkdown",
                "content": "**是否在线**\n ${data.realtime.isOnline === 1 ? "在线" : "不在线"}"
              },
              {
                "type": "kmarkdown",
                "content": "**队伍已满**\n ${data.realtime.partyFull === 1 ? "满" : "未满"}"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "排位"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**当前段位**\n ${translateRanking(data.global.rank.rankName)}"
              },
              {
                "type": "kmarkdown",
                "content": "**段位分数**\n ${data.global.rank.rankScore}"
              },
              {
                "type": "kmarkdown",
                "content": "**猎杀排名**\n ${data.global.rank.ladderPosPlatform}"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "竞技场"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "paragraph",
            "cols": 3,
            "fields": [
              {
                "type": "kmarkdown",
                "content": "**当前段位**\n ${translateRanking(data.global.arena.rankName)}"
              },
              {
                "type": "kmarkdown",
                "content": "**段位分数**\n ${data.global.arena.rankScore}"
              },
              {
                "type": "kmarkdown",
                "content": "**猎杀排名**\n ${data.global.arena.ladderPosPlatform}"
              }
            ]
          }
        }
      ]
    }
  ]`
)


// text format
// `[
//   {
//     "type": "card",
//     "theme": "secondary",
//     "size": "lg",
//     "modules": [
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "${curUser}的查询结果"
//         }
//       },
//       {
//         "type": "divider"
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "paragraph",
//           "cols": 3,
//           "fields": [
//             {
//               "type": "kmarkdown",
//               "content": "**游戏等级**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**是否在线**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**猎杀排名**\n9:00-21:00"
//             }
//           ]
//         }
//       },
//       {
//         "type": "divider"
//       },
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "排位"
//         }
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "paragraph",
//           "cols": 3,
//           "fields": [
//             {
//               "type": "kmarkdown",
//               "content": "**当前段位**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**段位分数**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**猎杀排名**\n9:00-21:00"
//             }
//           ]
//         }
//       },
//       {
//         "type": "divider"
//       },
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "竞技场"
//         }
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "paragraph",
//           "cols": 3,
//           "fields": [
//             {
//               "type": "kmarkdown",
//               "content": "**当前段位**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**段位分数**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**猎杀排名**\n9:00-21:00"
//             }
//           ]
//         }
//       }
//     ]
//   }
// ]`



export const apexQuery = new ApexQuery();