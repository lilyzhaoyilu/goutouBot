import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexCraft extends AppCommand {
  code = 'c'; // 只是用作标记
  trigger = 'c'; // 用于触发的文字
  help = '`.apex c` 来查询现在复制器里轮换的物品'; // 帮助文字
  intro = '`.apex c` 来查询现在复制器里轮换的物品';
  func: AppFunc<BaseSession> = async (session) => {

    try {
      const res = await getReachPredatorOnPC();
      const data = res.data;
      return session.sendCard(constructCard(data));
    } catch (err) {
      return session.quote('查询失败, 可能是一个bug, 请休息一下并且联系开发者~')
    }

  };
}


const getReachPredatorOnPC = () => {
  return axios.get(`https://api.mozambiquehe.re/crafting?auth=${auth.apexTracker}`)
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
            "content": "复制器现有轮换"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "每日轮换"
          }
        },
        {
          "type": "image-group",
          "elements": [
            {
              "type": "image",
              "src": "${data[0].bundleContent[0].itemType.asset}"
            },
            {
              "type": "image",
              "src": "${data[0].bundleContent[1].itemType.asset}"
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "每周轮换"
          }
        },
        {
          "type": "image-group",
          "elements": [
            {
              "type": "image",
              "src": "${data[1].bundleContent[0].itemType.asset}"
            },
            {
              "type": "image",
              "src": "${data[1].bundleContent[1].itemType.asset}"
            }
          ]
        }
      ]
    }
  ]`
}

export const apexCraft = new ApexCraft();





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
//           "content": "复制器现有轮换"
//         }
//       },
//       {
//         "type": "divider"
//       },
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "每日轮换"
//         }
//       },
//       {
//         "type": "image-group",
//         "elements": [
//           {
//             "type": "image",
//             "src": "https://img.kaiheila.cn/assets/2021-01/pWsmcLsPJq08c08c.jpeg"
//           },
//           {
//             "type": "image",
//             "src": "https://img.kaiheila.cn/assets/2021-01/YIfHfnvxaV0dw0dw.jpg"
//           }
//         ]
//       },
//       {
//         "type": "divider"
//       },
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "每周轮换"
//         }
//       },
//       {
//         "type": "image-group",
//         "elements": [
//           {
//             "type": "image",
//             "src": "https://img.kaiheila.cn/assets/2021-01/pWsmcLsPJq08c08c.jpeg"
//           },
//           {
//             "type": "image",
//             "src": "https://img.kaiheila.cn/assets/2021-01/YIfHfnvxaV0dw0dw.jpg"
//           }
//         ]
//       }
//     ]
//   }
// ]