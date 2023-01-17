

export class StringTranslation {
  static translateMap(map: string): string {
    switch (map) {
      case 'Storm Point':
        return '风暴点';
      case 'World\'s Edge':
        return '世界尽头';
      case 'Olympus':
        return '奥林匹斯';
      case 'Kings Canyon':
        return '诸王峡谷';
      case 'Party crasher':
        return '派对破坏者'
      case 'Phase runner':
        return '相位穿梭器'
      case 'Drop Off':
        return '原料厂'
      case 'Habitat':
        return '栖息地4'
      case 'Encore':
        return '再来一次'
      case 'Broken Moon':
        return '残月'
      case 'Overflow':
        return '熔岩流';
      case 'Barometer':
        return '晴雨表';
      case 'Lava Siphon':
        return '熔岩虹吸';
      default:
        return map
    }
  }

  static streamerSuperLink(streamerId: string) {
    switch (streamerId) {
      case "DF_Pite":
        return '[DF_Pite](https://www.douyu.com/5684726)';
      case "DF_3Mz_o":
        return '[DF_3Mz_o](https://www.douyu.com/1667826)';
      // 带鱼辰
      case "糕":
        return '[糕](https://live.bilibili.com/23504744)';
      // 青野 ε=(´ο｀*)))唉 他咋总改名啊
      case "Aono CN":
        return '[Aono CN](https://live.bilibili.com/21624651)';
      // 无名Noname
      case "Noname CN":
        return '[Noname CN](https://live.bilibili.com/9078252)';
      case "FPS_Bugs_Bunny":
        return '[FPS_Bugs_Bunny](https://www.huya.com/kasha233)';
      case "炸房死妈":
        return '[炸房死妈](https://www.douyu.com/6218591)';
      case "FC_WenXx":
        return "[FC_WenXx](https://live.bilibili.com/25803826)";
      // TODO: seprate the banned user out
      case "\\天使天才天王寺/":
        return "天使天才天王寺";
      case "JackieChan":
        return '此id被屏蔽无法显示';
      case "دعونا نختطف":
        return '此id无法显示'
      default:
        return streamerId;
    }
  }

  static translateRanking(rank: string, rankDiv: string = "0"): string {
    let curDiv = rankDiv === "0" ? '' : rankDiv;
    switch (rank) {
      case 'Apex Predator':
        return '(emj)apexpredator(emj)[1613997086764422/YGDDamgLlw0ay0a4] 猎杀';
      case 'Master':
        return '(emj)apexmaster(emj)[1613997086764422/dJ4V7cks8j09s09s] 大师';
      case 'Diamond':
        return `(emj)apexdiamond(emj)[1613997086764422/1BgsoSLJKA09s09s] 钻石${curDiv}`;
      case 'Platinum':
        return `(emj)apexplatinum(emj)[1613997086764422/eEedz4LWuW09s09s] 铂金${curDiv}`;
      case 'Gold':
        return `(emj)apexgold(emj)[1613997086764422/6jHbCAD7PG09s09s] 黄金${curDiv}`;
      case 'Silver':
        return `(emj)apexsilver(emj)[1613997086764422/mqU8LlBeyy09s09s] 白银${curDiv}`;
      case 'Bronze':
        return `(emj)apexbronze(emj)[1613997086764422/HLggEiqqsa0am0a7] 青铜${curDiv}`;
      case 'Rookie':
        return `(emj)apexrookie(emj)[1613997086764422/ufo2rAHuFZ03c03c] 菜鸟${curDiv}`
      case 'Unranked':
        return '未定级';
      default:
        return rank
    }
  }

  static translateCurrentState(data: any): string {
    const state = data.realtime.currentState;
    const party_full = data.realtime.partyFull === 0 ? "" : "(三人队)"
    const selected_legend = StringTranslation.translateLegend(data.realtime.selectedLegend);
    switch (state) {
      case 'inLobby':
        return `${selected_legend}在大厅`
      case 'inMatch':
        return `${selected_legend}游戏中${party_full}`;
      case 'offline':
        return '离线'
      default:
        return state;
    }
  }

  static translateLegend(legend: string): string {
    switch (legend) {
      case 'Bangalore':
        return '班加罗尔'
      case 'Bloodhound':
        return '寻血猎犬';
      case 'Revenant':
        return '亡灵';
      case 'Crypto':
        return '密客';
      case 'Horizon':
        return '地平线';
      case 'Gibraltar':
        return '直布罗陀';
      case 'Wattson':
        return '沃特森';
      case 'Fuse':
        return '暴雷';
      case 'Wraith':
        return '恶灵';
      case 'Octane':
        return '动力小子';
      case 'Caustic':
        return '侵蚀';
      case 'Lifeline':
        return '命脉';
      case 'Pathfinder':
        return '探路者';
      case 'Loba':
        return '罗芭';
      case 'Mirage':
        return '幻象';
      case 'Rampart':
        return '兰伯特';
      case 'Valkyrie':
        return '瓦尔基里';
      case 'Seer':
        return '希尔';
      case 'Ash':
        return '艾许';
      case 'Mad Maggie':
        return '疯玛吉';
      case 'Newcastle':
        return '纽卡斯尔';
      case 'Vantage':
        return '万蒂奇';
      case 'Catalyst':
        return '卡特莉丝';
      default:
        return legend;
    }
  }

  static convertEpochToDate(epoch: string): string {
    // reference: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
    const e = new Date(0);
    e.setUTCSeconds(parseInt(epoch));
    const d = new Date(e).toLocaleDateString("zh-CN", {
      hour: 'numeric', hourCycle: 'h12',
      dayPeriod: 'long', timeZone: 'Asia/Shanghai'
    });
    return d;
  }
}