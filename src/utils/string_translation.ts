import { RANK_TO_EMOJI } from './assets';

export class StringTranslation {
  static TRANSLATE_LEGEND = new Map([
    ['Bangalore', '班加罗尔'],
    ['Bloodhound', '寻血猎犬'],
    ['Revenant', '亡灵'],
    ['Crypto', '密客'],
    ['Horizon', '地平线'],
    ['Gibraltar', '直布罗陀'],
    ['Wattson', '沃特森'],
    ['Fuse', '暴雷'],
    ['Wraith', '恶灵'],
    ['Octane', '动力小子'],
    ['Caustic', '侵蚀'],
    ['Lifeline', '命脉'],
    ['Pathfinder', '探路者'],
    ['Loba', '罗芭'],
    ['Mirage', '幻象'],
    ['Rampart', '兰伯特'],
    ['Valkyrie', '瓦尔基里'],
    ['Seer', '希尔'],
    ['Ash', '艾许'],
    ['Mad', '疯玛吉'],
    ['Mad Maggie', '疯玛吉'],
    ['Newcastle', '纽卡斯尔'],
    ['Vantage', '万蒂奇'],
    ['Catalyst', '卡特莉丝']
  ])

  static TRANSLATE_QUERY_RANK = new Map([
    ['pred', 'Masterpred'],
    ['master', 'Masterpred'],
    ['diamond', 'Diamond'],
    ['platinum', 'Platinum'],
  ])

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
      case 'Hammond Labs':
        return '哈蒙德实验室';
      case 'Siphone':
        return '熔岩虹吸';
      default:
        return map
    }
  }

  static streamerSuperLink(streamerId: string) {
    switch (streamerId) {
      case "DF_":
        return '[DF_巴巴托斯](https://www.douyu.com/5684726)';
      case "DF_3Mz4090":
        return '[DF_3Mz4090](https://www.douyu.com/1667826)';
      // 带鱼辰
      case "AGL_QQ-w-":
        return '[AGL_QQ-w-](http://live.douyin.com/458897981613)';
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
        return `${RANK_TO_EMOJI.get(rank)} 猎杀`;
      case 'Master':
        return `${RANK_TO_EMOJI.get(rank)} 大师`;
      case 'Diamond':
        return `${RANK_TO_EMOJI.get(rank)} 钻石${curDiv}`;
      case 'Platinum':
        return `${RANK_TO_EMOJI.get(rank)} 铂金${curDiv}`;
      case 'Gold':
        return `${RANK_TO_EMOJI.get(rank)} 黄金${curDiv}`;
      case 'Silver':
        return `${RANK_TO_EMOJI.get(rank)} 白银${curDiv}`;
      case 'Bronze':
        return `${RANK_TO_EMOJI.get(rank)} 青铜${curDiv}`;
      case 'Rookie':
        return `${RANK_TO_EMOJI.get(rank)} 菜鸟${curDiv}`
      case 'Unranked':
        return '未定级';
      default:
        return rank
    }
  }

  static translateCurrentState(data: any): string {
    const state = data.realtime?.currentState;
    const party_full = data.realtime?.partyFull === 0 ? "" : "(三人队)"
    const selected_legend = StringTranslation.translateLegend(data.realtime.selectedLegend);
    switch (state) {
      case 'inLobby':
        return `${selected_legend}在大厅`
      case 'inMatch':
        return `${selected_legend}游戏中${party_full}`;
      case 'offline':
        return '离线或只能邀请'
      default:
        return state;
    }
    return '';
  }

  // TODO: Deprecate this
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