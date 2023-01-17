
import { Card, BaseSession } from 'kbotify';
import { STREAMER, StreamerAsset } from './streamer_assets';
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

    const query_res = await ApexLegendsStatus.getQuery(session, streamer.origin_id);
    Streamer.buildStreamerTopSection(card, live_res, streamer);
    GoutouCard.buildPlayerInfoSection(card, query_res, false)
    Streamer.buildStreamerTail(card);
    return card;
  }

  static async getLiveData(streamer: StreamerAsset) {
    const res = streamer.platform === "douyu" ? await LivePlatform.getDouyuLiveData(streamer.roomNumber) : await LivePlatform.getBiliBiliLiveData(streamer.roomNumber);
    return res;
  }

  static async buildStreamerTopSection(card: Card, res: any, streamer: StreamerAsset) {
    card.addText(`[${res.streamerName}的直播间](${res.url})  ${Streamer.buildCustomizedStreamingTest(res.isStreaming, streamer)}`, true, 'left', {
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

  static async BuildLiveSection(card: Card, res: any) {
    card.addText(`${res.roomName}`);
    card.addImage(res.roomThumb)
  }

  static buildStreamerTail(card: Card) {
    card.addModule({
      type: "context", elements: [{
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": "`.apex s` 查看其它支持快速查询的主播"
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
        "content": "新春快乐！如果还有其他你想看到的主播，请私信狗头哦~"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }]
    })
  }

  static buildCustomizedStreamingTest(isStreaming: boolean, streamer: StreamerAsset) {
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
}