

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
        return '猎杀';
      case 'Master':
        return '大师';
      case 'Diamond':
        return `钻石${curDiv}`;
      case 'Platinum':
        return `铂金${curDiv}`;
      case 'Gold':
        return `黄金${curDiv}`;
      case 'Silver':
        return `白银${curDiv}`;
      case 'Bronze':
        return `青铜${curDiv}`;
      case 'Unranked':
        return '未定级';
      default:
        return rank
    }
  }

  static translateCurrentState(state: string): string {
    switch (state) {
      case 'inLobby':
        return '在大厅'
      case 'inMatch':
        return '游戏中';
      case 'offline':
        return '离线'
      default:
        return state;
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