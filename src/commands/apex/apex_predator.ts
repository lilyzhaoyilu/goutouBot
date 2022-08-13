import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import auth from '../../configs/auth';
const axios = require('axios');

class ApexPredator extends AppCommand {
  code = 'p'; // 只是用作标记
  trigger = 'p'; // 用于触发的文字
  help = '`.apex p` 来查询现在需要达到猎杀的分数'; // 帮助文字
  intro = '`.apex p` 来查询现在需要达到猎杀的分数';
  func: AppFunc<BaseSession> = async (session) => {

    try {
      const res = await getReachPredatorOnPC();
      const data = res.data;
      return session.sendCard(constructCard(data, session));
    } catch (err) {
      return session.quote('查询失败, 可能是一个bug, 请休息一下并且联系开发者~')
    }

  };
}


const getReachPredatorOnPC = () => {
  return axios.get(`https://api.mozambiquehe.re/predator?auth=${auth.apexTracker}`)
}

const constructCard = (data: any, session: any) => {

  // TODO: take the `check vip function` out.

  let vip = false;
  if (session.user.username === 'justdaybyday' && session.user.identifyNum === '2154') {
    vip = true;
  }

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
            "content": "猎杀分数线 (PC端)"
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
                "content": "**当前猎杀最低排名**
                ${data.RP.PC.foundRank}"
              },
              {
                "type": "kmarkdown",
                "content": "**当前猎杀最低分数**
                ${data.RP.PC.val}"
              },
              {
                "type": "kmarkdown",
                "content": "**当前大师及猎杀人数**
                ${data.RP.PC.totalMastersAndPreds}"
              }
            ]
          }
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "竞技场分数线 (PC端)"
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
                "content": "**当前猎杀最低排名**
                ${data.AP.PC.foundRank}"
              },
              {
                "type": "kmarkdown",
                "content": "**当前猎杀最低分数**
                ${data.AP.PC.val}"
              },
              {
                "type": "kmarkdown",
                "content": "**当前大师及猎杀人数**
                ${data.AP.PC.totalMastersAndPreds}"
              }
            ]
          }
        }${!vip ? `` : `,{
          "type": "context",
          "elements": [
            {
              "type": "plain-text",
              "content": "cenxin giegie今天早睡了吗？要加油哟(＾Ｕ＾)ノ~ＹＯ"
            },
            {
              "type": "image",
              "src": "https://p2.picjs.xyz/2022/05/20220515190148364.jpg"
            }
          ]
        }`}
      ]
    }
  ]`
}



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
//           "content": "猎杀分数线 (PC端)"
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
//               "content": "**当前排名**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**当前猎杀最低分数**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**当前大师及猎杀人数**\n9:00-21:00"
//             }
//           ]
//         }
//       },
//       {
//         "type": "header",
//         "text": {
//           "type": "plain-text",
//           "content": "竞技场分数线 (PC端)"
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
//               "content": "**当前排名**\n白给Doc"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**当前猎杀最低分数**\n吐槽中心"
//             },
//             {
//               "type": "kmarkdown",
//               "content": "**当前大师及猎杀人数**\n9:00-21:00"
//             }
//           ]
//         }
//       }
//     ]
//   }
// ]



export const apexPredator = new ApexPredator();