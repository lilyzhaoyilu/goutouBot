
import { Card, BaseSession } from 'kbotify';
import { STREAMER, StreamerAsset, UidToStreamerAsset } from './streamer_assets';
import { LivePlatform, LiveData } from './live_platform_api';
import { GoutouCard } from './goutou_card';
import { ApexLegendsStatus } from './apex_legends_status_api';

export class Streamer {

  static async assembleStreamerCard(name: string, session: BaseSession) {
    const card = new Card().setTheme('secondary').setSize('lg');
    if (!STREAMER.hasOwnProperty(name)) {
      return card.addText("没有这个主播")
    };
    const streamer = STREAMER[name];
    const live_res = await Streamer.getLiveData(streamer);
    Streamer.buildStreamerTopSection(card, live_res, streamer);
    // TODO: Refactor this code
    if (streamer.eaInfo?.id) {
      const query_res = await ApexLegendsStatus.getQuery(session, streamer.eaInfo?.id);
      GoutouCard.buildPlayerInfoSection(card, query_res, false, true);
    } else {
      Streamer.buildNoOriginIdSection(card);
    }
    Streamer.buildStreamerTail(card);
    return card;
  }

  static async getLiveData(streamer: StreamerAsset) {
    switch (streamer.platform) {
      case "douyu":
        return await LivePlatform.getDouyuLiveData(streamer.roomNumber);
      case "bilibili":
        if (!streamer.biliUid) return;
        return await LivePlatform.getBiliBiliLiveData(streamer.roomNumber, streamer.biliUid);
      default:
        return;
    }
  }

  static async buildStreamerTopSection(card: Card, res: any, streamer: StreamerAsset) {
    card.addText(`[${res.streamerName}的直播间](${res.url})  ${Streamer.buildCustomizedLiveText(res.isStreaming, streamer)}`, true, 'left', {
      "type": "image",
      "src": res.avatar,
      "size": "lg"
    })
    Streamer.buildSloganSection(streamer, card);
    if (res.isStreaming) {
      Streamer.BuildLiveSection(card, res)
    }

    return card;
  }

  static buildNoOriginIdSection(card: Card) {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/53E0FkCSL115o15o.png"
      },
      {
        "type": "plain-text",
        "content": "这个主播暂时还没有提供他想展示的账号，如果你知道他的账号的话，请私信Apex查询狗头~"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/53E0FkCSL115o15o.png"
      }]
    })
  }

  static async BuildLiveSection(card: Card, res: any) {
    card.addText(`**${res.roomName}**`);
    card.addImage(res.roomThumb);
  }

  static buildStreamerTail(card: Card) {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": ".主播 查看其它支持快速查询的主播"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }]
    })
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": "如果还有其他你想看到的主播，请私信狗头哦~"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }]
    })
  }

  static buildCustomizedLiveText(isStreaming: boolean, streamer: StreamerAsset) {
    if (isStreaming) {
      return streamer.customized?.textStreaming ? streamer.customized?.textStreaming : "直播中";
    } else {
      return streamer.customized?.textOffline ? streamer.customized?.textOffline : "暂未开播";
    }
  }

  static buildSloganSection(streamer: StreamerAsset, card: Card) {

    if (!streamer.customized?.sloganImage && streamer.customized?.sloganText) {
      card.addModule({
        type: "context",
        elements: [
          {
            "type": "plain-text",
            "content": `${streamer.customized?.sloganText}`
          }
        ]
      })
      return ``
    }

    if (streamer.customized?.sloganImage && streamer.customized?.sloganText) {
      card.addModule({
        type: "context",
        elements: [
          {
            "type": "image",
            "src": `${streamer.customized?.sloganImage}`
          },
          {
            "type": "image",
            "src": `${streamer.customized?.sloganImage}`
          },
          {
            "type": "plain-text",
            "content": `${streamer.customized?.sloganText}`
          }
        ]
      })
    };
  }

  static addStreamerRoomLinkBasedOnUid(uid: string | undefined) {
    if (!uid) return '';
    if (UidToStreamerAsset[uid] && UidToStreamerAsset[uid]["platform"] && UidToStreamerAsset[uid]["roomNumber"]) {
      switch (UidToStreamerAsset[uid]["platform"]) {
        case 'douyu':
          return `https://www.douyu.com/${UidToStreamerAsset[uid]["roomNumber"]}`;
        case 'huya':
          return `https://www.huya.com/${UidToStreamerAsset[uid]["roomNumber"]}`;
        case 'douyin':
          return `https://live.douyin.com/${UidToStreamerAsset[uid]["roomNumber"]}`;
        case 'bilibili':
          return `https://live.bilibili.com/${UidToStreamerAsset[uid]["roomNumber"]}`;
        default:
          return '';
      }
    }
    return '';
  }
}