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

    const curUser = session.user.nickname || session.user.username;
    const queryUser = session.args[0];
    await axios.get(`https://api.mozambiquehe.re/bridge?auth=${auth.apexTracker}&player=${queryUser}&platform=PC`).then((res: any) => {

      // res might return 200 when not finding user data
      if (res.data.Error) {
        session.client.API.message.create(9, '9682242694390929', `:grey_question: Apex query notfound: currentUser ${curUser}#${session.user.identifyNum} has error: ${res.data.Error} when querying: ${queryUser}`);
        return session.sendCard(constructNotFoundCard(curUser, queryUser));
      }
      // send back query result
      return session.sendCard(constructCard(curUser, res.data));
    }).catch((err: any) => {

      if (!axios.isAxiosError(err)) {

        // Handle query in Chinese
        if (err.code === 'ERR_UNESCAPED_CHARACTERS') {
          return session.quote('暂时不支持对中文ID的查询。如果你的Origin ID是中文的，请私信狗头这个问题。提交真的bug，狗头有小红包给你哦~');
        }

        console.error(`ERROR at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} in **QUERY**: ${err}`)
        return session.sendCard(constructErrorCard(curUser));
      }
      switch (err.response.status) {
        // did not find data
        case 404:
          session.client.API.message.create(9, '9682242694390929', `:grey_question: Apex query notfound: currentUser ${curUser}#${session.user.identifyNum} has error: ${err} when querying: ${queryUser}`);
          return session.sendCard(constructNotFoundCard(curUser, queryUser));
          break;
        // over rate limit
        case 429:
          session.client.API.message.create(9, '9682242694390929', `:no_entry: Apex query overlimit: currentUser ${curUser}#${session.user.identifyNum} has error: ${err} when querying: ${queryUser}`);
          return session.sendCard(constructOverlimitCard(curUser));
          break;
        default:
          session.client.API.message.create(9, '9682242694390929', `:no_entry: Apex query error: currentUser ${curUser}#${session.user.identifyNum} has error: ${err} when querying: ${queryUser}`);
          return session.sendCard(constructErrorCard(curUser));
      }

    });



    // then((res: any) => {
    //   console.log('corgi hit res');
    //   console.log('corgi res', typeof res, ' ***: ', res);

    //   console.log(res.data); //data
    //   console.log('--------')
    //   console.log(res.status); //200
    //   console.log('--------')
    //   console.log(res.statusText); //OK
    //   console.log('--------')
    //   console.log(res.headers);
    //   console.log('--------')
    //   console.log(res.config);
    //   console.log('--------')
    // }).catch((err: any) => {
    //   console.log('corgi hit err');
    //   console.log('corgi err', typeof err, ' ***: ', err);
    //   console.log('--------')
    //   console.log('data: ', err.response.data); // {error: ...}
    //   console.log('--------')
    //   console.log('stat: ', err.response.status); //404
    //   console.log('--------')
    //   console.log('header: ', err.response.headers);
    //   console.log('--------')
    // });

  }
};


const constructNotFoundCard = (curUser: string, queryUser: string) => {
  return `[
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
            "type": "kmarkdown",
            "content": "没有查询到关于 ${queryUser} 的数据，目前只支持用Origin平台的ID进行查询。"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "如果是第一次使用查询功能，请去 [apexlegendsstatus.com](https://apexlegendsstatus.com/stats/) 查一下自己的橘子ID，让自己的 ID 进入到数据库中（绿色箭头）。请确保选择PC平台（黄色箭头）。"
          }
        },
        {
          "type": "container",
          "elements": [
            {
              "type": "image",
              "src": "https://img.kookapp.cn/assets/2022-07/NZQpzi8xLI19t0ib.png"
            }
          ]
        }
      ]
    }
  ]`
}

const constructErrorCard = (curUser: string) => {
  return `[
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
            "type": "kmarkdown",
            "content": "查询出现了错误，狗头已经记录了这个错误，会在周末的时候进行维修和升级。:computer:"
          }
        }
      ]
    }
  ]`
}

const constructOverlimitCard = (curUser: string) => {
  return `[
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
            "type": "kmarkdown",
            "content": "同一时间查询的次数超过了服务器限制，请再试一下。如果你觉得这是一个bug，可以私信狗头。对于确实存在的bug，狗头有小红包给你哦~:blush:"
          }
        }
      ]
    }
  ]`
}


const translateRanking = (rank: string) => {
  switch (rank) {
    case 'Apex Predator':
      return '猎杀';
      break;
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
                "content": "**当前段位** ${translateRanking(data.global.rank.rankName)}"
              },
              {
                "type": "kmarkdown",
                "content": "**段位分数** ${data.global.rank.rankScore}"
              },
              {
                "type": "kmarkdown",
                "content": "**猎杀排名** ${data.global.rank.ladderPosPlatform}"
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
                "content": "**当前段位** ${translateRanking(data.global.arena.rankName)}"
              },
              {
                "type": "kmarkdown",
                "content": "**段位分数** ${data.global.arena.rankScore}"
              },
              {
                "type": "kmarkdown",
                "content": "**猎杀排名** ${data.global.arena.ladderPosPlatform}"
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