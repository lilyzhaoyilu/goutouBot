import { BaseSession, Card } from "kbotify";
import { ErrorHandler } from "./error_handler";
import { Streamer } from "./streamer_handler";
import { StringTranslation } from "./string_translation";
import { PROFILE_NESSIE, SILVRE_NESSIE, YELLOW_NESSIE, RED_NESSIE, APEX_LOGO_RED } from "./assets";

export class GoutouCard {

  static baseCard() {
    const card = new Card().setColor('#b2e9b0').setSize('lg');
    return card;
  }

  static getName(session: BaseSession): string {
    const name = session.user.nickname ? session.user.nickname : session.user.username;
    return name;
  }

  static async buildPlayerInfoSection(card: Card, data: any, addNoteInSession: boolean = true, isStreamerQuery = false) {
    if (isStreamerQuery && data instanceof Card) {
      return card;
    }
    const br_rank = data.global?.rank?.ladderPosPlatform === undefined ? '数据错误' : data.global?.rank?.ladderPosPlatform;
    const club_name = data.club?.name ? data.club?.name : '狗头没查到';
    const account_level = data.global?.level === undefined ? '狗头没查到' : data.global?.level;
    const level_presitige = data.global?.levelPrestige ? `声望(转生):${data.global?.levelPrestige}` : ''
    if (addNoteInSession) {
      card.addModule({
        type: "context", elements: [{
          "type": "image",
          "src": PROFILE_NESSIE
        },
        {
          "type": "plain-text",
          "content": "这里显示的是这个用户的游戏内名字。如果该用户绑定了EA和Steam, 那么显示的是Steam Id."
        },
        {
          "type": "image",
          "src": PROFILE_NESSIE
        }]
      })
    }
    card.addModule({
      type: "section", text: {
        "type": "paragraph",
        "cols": 2,
        "fields": [
          {
            "type": "kmarkdown",
            "content": `**账号信息** \n等级:${account_level} ${level_presitige} \n${StringTranslation.translateCurrentState(data)} \n俱乐部:${club_name}`
          },
          {
            "type": "kmarkdown",
            "content": `**大逃杀排位** \n${StringTranslation.translateRanking(data.global?.rank?.rankName, data.global?.rank?.rankDiv)} \n${br_rank === -1 ? '无排' : br_rank}名 \n${data.global?.rank?.rankScore} RP`
          }
        ]
      }
    })
    return card;
  }

  static async sendQueringCard(session: BaseSession) {
    const queryingCard = GoutouCard.baseCard();
    queryingCard.addModule({
      type: "section", "text": {
        "type": "kmarkdown",
        "content": `(font)正在努力查询中~(font)[success]\n如果不能更新卡片请再试一下~\n请不要删除查询信息\n请确保机器人在频道内有以下权限:\n-能更新卡片\n-没有被限速`
      },
      mode: "left",
      accessory: {
        "type": "image",
        "src": `https://img.kookapp.cn/assets/2023-01/P6NOVViwut046046.gif`,
        "size": "sm"
      }
    })

    let res;
    try {
      res = await session.replyCard(queryingCard);
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, "querying card error")
    } finally {
      return res ? res.msgSent?.msgId : '';
    }
  }

  static buildGenericErrorCard(session: BaseSession): Card {
    const name = GoutouCard.getName(session);
    const card = GoutouCard.baseCard();
    card.addTitle(`${name}的查询结果`);
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `"查询出现了错误，请等一下再试。狗头已经记录了这个错误，会在周末的时候进行维修和升级。:computer:\n如果还有问题，可以点击机器人头像 -> 私信。看到了就会回复的！`
      }
    });
    return card;
  }

  static buildQueryNotFoundCard(session: BaseSession) {
    // add origin id + steam platform pic
    const name = GoutouCard.getName(session);
    const card = GoutouCard.baseCard();
    card.addTitle(`${name}的查询结果`);
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `没有查询到关于${session.args[0]}的数据, 目前Apex查询狗头只支持用EA的ID进行查询。\n想根据Steam Id查询, 请用[apexlegendsstatus](https://apexlegendsstatus.com/stats/)。`
      }
    });
    GoutouCard.addTailWantToQueryStreamers(card);
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `如果不太会用，请看[这个使用教程的第47秒](https://www.bilibili.com/video/BV1Eg41127y3/?p=2)`
      }
    });
    card.addDivider();
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `如果是第一次使用查询功能，请去 [apexlegendsstatus.com](https://apexlegendsstatus.com/stats/) 查一下自己的EA Id, 让自己的 Id 进入到数据库中(绿色箭头)。请确保选择PC平台(黄色箭头)。`
      }
    });

    card.addImage("https://img.kookapp.cn/assets/2022-07/NZQpzi8xLI19t0ib.png");

    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `搜到自己之后找到下图部分, 右边的id是EA Id`
      }
    });
    card.addImage("https://img.kookapp.cn/assets/2023-01/tdvT1j73qT08k039.png");
    return card;
  }

  static buildNoCNOriginIdCard(session: BaseSession) {
    const card = new Card();
    card.addText("origin id没有中文的哦~ origin id的组成是英文字母加上`-` `_`");
    card.addText("可以在[apexlegendsstatus.com](https://apexlegendsstatus.com/stats/) 查找steam id。");
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
              "content": "同一时间查询的次数超过了服务器限制，请再试一下。如果你觉得这是一个bug，可以私信狗头。对于确实存在的bug，狗头有小红包给你哦~:blush:"
            }
          }
        ]
      }
    )
    return card;
  }

  static addTailWantToQueryStreamers(card: Card) {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": SILVRE_NESSIE
      },
      {
        "type": "kmarkdown",
        "content": "想查询查主播, 试试 \`。主播\` 吧~"
      },
      {
        "type": "image",
        "src": SILVRE_NESSIE
      }]
    })
  }

  static addTailWantToQueryMoreStreamers(card: Card) {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": SILVRE_NESSIE
      },
      {
        "type": "kmarkdown",
        "content": "如果还有其他你想看到的主播，请私信狗头哦~"
      },
      {
        "type": "image",
        "src": SILVRE_NESSIE
      }]
    })
  }

  static addTailALS(card: Card, url = "", tail = "") {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": PROFILE_NESSIE
      },
      {
        "type": "kmarkdown",
        "content": `数据来源自[apexlegendsstatus.com](${url})${tail}`
      },
      {
        "type": "image",
        "src": PROFILE_NESSIE
      }]
    });
  }

  static addTailMessageGoutouIfQuestion = (card: Card) => {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": PROFILE_NESSIE
      },
      {
        "type": "kmarkdown",
        "content": `如果有意见和问题，可以直接私信狗头机器人~`
      },
      {
        "type": "image",
        "src": PROFILE_NESSIE
      }]
    });
  }
}
