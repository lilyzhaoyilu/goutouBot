import { BaseSession, Card } from "kbotify";
import { ErrorHandler } from "./error_handler";
import { Streamer } from "./streamer_handler";
import { StringTranslation } from "./string_translation";


export class GoutouCard {

  static getName(session: BaseSession): string {
    const name = session.user.nickname ? session.user.nickname : session.user.username;
    return name;
  }

  static async buildPlayerInfoSection(card: Card, data: any, noteSession: boolean = true) {
    const br_rank = data.global.rank.ladderPosPlatform
    const areana_rank = data.global.arena.ladderPosPlatform;
    const club_name = data.club?.name === undefined ? '' : data.club.name;

    if (noteSession) {
      card.addModule({
        type: "context", elements: [{
          "type": "image",
          "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
        },
        {
          "type": "plain-text",
          "content": "这里显示的是这个用户的游戏内名字。如果该用户绑定了Origin和Steam, 那么显示的是Steam ID."
        },
        {
          "type": "image",
          "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
        }]
      })
    }
    card.addModule({
      type: "section", text: {
        "type": "paragraph",
        "cols": 3,
        "fields": [
          {
            "type": "kmarkdown",
            "content": `**账号信息** \n等级:${data.global.level} \n${StringTranslation.translateCurrentState(data)} \n俱乐部:${club_name}`
          },
          {
            "type": "kmarkdown",
            "content": `**大逃杀排位** \n${StringTranslation.translateRanking(data.global.rank.rankName, data.global.rank.rankDiv)} \n${br_rank === -1 ? '无排' : br_rank}名 \n${data.global.rank.rankScore} RP`
          },
          {
            "type": "kmarkdown",
            "content": `**竞技场排位** \n${StringTranslation.translateRanking(data.global.arena.rankName, data.global.arena.rankDiv)} \n${areana_rank === -1 ? '无排' : areana_rank}名 \n${data.global.arena.rankScore} AP`
          }
        ]
      }
    })
    return card;
  }

  static async sendQueringCard(session: BaseSession) {
    const queryingCard = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "section",
          "text": {
            "type": "plain-text",
            "content": "正在努力查询中"
          },
          "mode": "left",
          "accessory": {
            "type": "image",
            "src": "https://img.kookapp.cn/assets/2023-01/P6NOVViwut046046.gif",
            "size": "sm"
          }
        }
      ]
    }
  ]`
    try {
      const res = await session.replyCard(queryingCard);
      return res.msgSent?.msgId;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, "querying")
    }
  }

  static buildGenericErrorCard(session: BaseSession) {
    const name = GoutouCard.getName(session);
    const card = new Card(
      {
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
          {
            "type": "header",
            "text": {
              "type": "plain-text",
              "content": `${name}的查询结果`
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
          }, {
            "type": "context",
            "elements": [{
              "type": "image",
              "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
            },
            {
              "type": "plain-text",
              "content": "新春快乐！想查询主播吗？.apex s 查看支持快速查询的主播！比如皮特三明治~"
            },
            {
              "type": "image",
              "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
            }
            ]
          }
        ]
      })

    return card;
  }

  static buildQueryNotFoundCard(session: BaseSession) {
    // add origin id + steam platform pic
    const name = GoutouCard.getName(session);
    const card = new Card(
      {
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
          {
            "type": "header",
            "text": {
              "type": "plain-text",
              "content": `${name}的查询结果`
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "kmarkdown",
              "content": `没有查询到关于${session.args[0]}的数据，目前只支持用Origin平台的ID进行查询。`
            }
          }, {
            "type": "context",
            "elements": [{
              "type": "image",
              "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
            },
            {
              "type": "plain-text",
              "content": "新春快乐！想查询主播吗？.apex s 查看支持快速查询的主播！比如皮特三明治~"
            },
            {
              "type": "image",
              "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
            }
            ]
          },
          {
            "type": "section",
            "text": {
              "type": "kmarkdown",
              "content": "如果不太会用，请看[这个使用教程的第47秒](https://www.bilibili.com/video/BV1Eg41127y3/?p=2)"
            }
          },
          {
            "type": "divider"
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
          }, {
            "type": "section",
            "text": {
              "type": "kmarkdown",
              "content": "搜到自己之后找到下图部分，右边的id是origin id"
            }
          },
          {
            "type": "container",
            "elements": [
              {
                "type": "image",
                "src": "https://img.kookapp.cn/assets/2023-01/tdvT1j73qT08k039.png"
              }
            ]
          }
        ]
      }
    )

    return card;
  }

  static buildNoCNOriginIdCard(session: BaseSession) {
    const card = new Card();
    card.addText("origin id没有中文的哦~ 可以在[apexlegendsstatus.com](https://apexlegendsstatus.com/stats/) 查找steam id。")
    return new Card(card);
  }

  static buildOverLimitCard(session: BaseSession) {
    // TODO: merge with generic
    const name = GoutouCard.getName(session);
    const card = new Card(
      {
        "type": "card",
        "theme": "secondary",
        "size": "lg",
        "modules": [
          {
            "type": "header",
            "text": {
              "type": "plain-text",
              "content": "${name}的查询结果"
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
    )
    return card;
  }
}
