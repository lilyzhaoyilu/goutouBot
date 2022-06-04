import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexMap extends AppCommand {
  code = 'map'; // 只是用作标记
  trigger = 'map'; // 用于触发的文字
  help = '发送`.apex map`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    try {
      const res = await getCurrentMapRotation();
      const data = res.data;
      console.log('leo data:', data);
      return session.sendCard(constructCard(data));
    } catch (err) {
      console.log('leo', err);
      return session.quote('查询失败, 可能是一个bug, 请休息一下并且联系开发者~')
    }
  };
}

const getCurrentMapRotation = () => {
  return axios.get(`https://api.mozambiquehe.re/maprotation?auth=${auth.apexTracker}&version=2`)
}


const translateMap = (map: string) => {
  switch (map) {
    case 'Storm Point':
      return '风暴点';
      break;
    case 'World\'s Edge':
      return '世界尽头';
      break;
    case 'Olympus':
      return '奥林匹斯';
      break;
    case 'Kings Canyon':
      return '诸王峡谷';
      break;
    default:
      return map
  }
}

const constructCard = (data: any) => {
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
          "content": "地图查询（大逃杀）"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "**匹配**"
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
              "content": "**当前地图**   
              ${translateMap(data.battle_royale.current.map)}"
            },
            {
              "type": "kmarkdown",
              "content": "**剩余时间**   
              ${translateMap(data.battle_royale.current.remainingTimer)}"
            },
            {
              "type": "kmarkdown",
              "content": "**下张地图**   
              ${translateMap(data.battle_royale.next.map)}"
            }
          ]
        }
      },
      {
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": "**排位**"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": [
            {
              "type": "kmarkdown",
              "content": "**上半赛季** ${translateMap(data.ranked.current.map)}"
            },
            {
              "type": "kmarkdown",
              "content": "**下半赛季** ${translateMap(data.ranked.next.map)}"
            }
          ]
        }
      }
    ]
  }
]`

}

export const apexMap = new ApexMap();



// Note: add THREE spaces after section's title to make "next line" work

// [
//   {
//     "type": "card",
//     "theme": "secondary",
//     "size": "lg",
//     "modules": [
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "地图查询（大逃杀）"
//         }
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "kmarkdown",
//           "content": "**匹配**"
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
//               "content": "**当前地图**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**剩余时间**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**下张地图**\n9:00-21:00"
//             }
//           ]
//         }
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "kmarkdown",
//           "content": "**排位**"
//         }
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "paragraph",
//           "cols": 2,
//           "fields": [
//             {
//               "type": "kmarkdown",
//               "content": "**上半赛季**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**下半赛季**\n吐槽中心"
//             }
//           ]
//         }
//       }
//     ]
//   }
// ]