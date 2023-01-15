export const convertEpochToDate = (epoch: string) => {
  // reference: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
  const e = new Date(0);
  e.setUTCSeconds(parseInt(epoch));
  const d = new Date(e).toLocaleDateString("zh-CN", {
    hour: 'numeric', hourCycle: 'h12',
    dayPeriod: 'long', timeZone: 'Asia/Shanghai'
  });
  return d;
}

export const streamerSuperLink = (streamerId: string) => {
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

export const rankToImage = new Map<string, string>(
  [
    ["1", "https://img.kookapp.cn/assets/2023-01/53E0FkCSL115o15o.png"],
    ["2", "https://img.kookapp.cn/assets/2023-01/GW5ajSOOvF15o15o.png"],
    ["3", "https://img.kookapp.cn/assets/2023-01/kmhzzszZYj15o15o.png"],
    ["4", "https://img.kookapp.cn/assets/2023-01/nf0GRGA0qa15o15o.png"],
    ["5", "https://img.kookapp.cn/assets/2023-01/0kxkaqW8CB15o15o.png"],
    ["6", "https://img.kookapp.cn/assets/2023-01/VMycxIlJrq023023.png"],
    ["7", "https://img.kookapp.cn/assets/2023-01/NUukfQkl42023023.png"],
    ["8", "https://img.kookapp.cn/assets/2023-01/6fshKjO6Ga023023.png"],
    ["9", "https://img.kookapp.cn/assets/2023-01/WOSDwks5AE023023.png"],
    ["10", "https://img.kookapp.cn/assets/2023-01/UVUaW2NOiZ023023.png"],
    ["11", "https://img.kookapp.cn/assets/2023-01/m1PDhbOMoc023023.png"],
    ["12", "https://img.kookapp.cn/assets/2023-01/ssXJMaB6zK023023.png"],
    ["13", "https://img.kookapp.cn/assets/2023-01/ANEt6nqsjY023023.png"],
    ["14", "https://img.kookapp.cn/assets/2023-01/80xicgzqhW023023.png"],
    ["15", "https://img.kookapp.cn/assets/2023-01/Ysk00ocnkI023023.png"],
    ["16", "https://img.kookapp.cn/assets/2023-01/MH6l1K9ZER023023.png"],
    ["17", "https://img.kookapp.cn/assets/2023-01/aeMVXqPPGi023023.png"],
    ["18", "https://img.kookapp.cn/assets/2023-01/o3sOglDMAa023023.png"],
    ["19", "https://img.kookapp.cn/assets/2023-01/USjXIa1QCZ023023.png"],
    ["20", "https://img.kookapp.cn/assets/2023-01/SwSfudHxqP023023.png"],
    ["21", "https://img.kookapp.cn/assets/2023-01/trThAqMyiK023023.png"],
    ["22", "https://img.kookapp.cn/assets/2023-01/L2hs5sq7nz023023.png"],
    ["23", "https://img.kookapp.cn/assets/2023-01/9aaCYx47A3023023.png"],
    ["24", "https://img.kookapp.cn/assets/2023-01/xBm8oVc3zz023023.png"],
    ["25", "https://img.kookapp.cn/assets/2023-01/inmgolgRk0023023.png"],
    ["26", "https://img.kookapp.cn/assets/2023-01/Q7WZl4ZHGz023023.png"],
    ["27", "https://img.kookapp.cn/assets/2023-01/m8Eg1tAiWC023023.png"],
    ["28", "https://img.kookapp.cn/assets/2023-01/u1pcnwuuhl023023.png"],
    ["29", "https://img.kookapp.cn/assets/2023-01/aOEwbAeLqx023023.png"],
    ["30", "https://img.kookapp.cn/assets/2023-01/XvruKbWKDN023023.png"],
    ["31", "https://img.kookapp.cn/assets/2023-01/9fOopg95Oc023023.png"],
    ["32", "https://img.kookapp.cn/assets/2023-01/3RLMgY8qc5023023.png"],
    ["33", "https://img.kookapp.cn/assets/2023-01/Pzf4xhzKiR023023.png"],
    ["34", "https://img.kookapp.cn/assets/2023-01/BMrrr2vz4N023023.png"],
    ["35", "https://img.kookapp.cn/assets/2023-01/bZvn5v4BFE023023.png"],
    ["36", "https://img.kookapp.cn/assets/2023-01/ea5SYzdM0G023023.png"],
    ["37", "https://img.kookapp.cn/assets/2023-01/OtjM5jrVcf023023.png"],
    ["38", "https://img.kookapp.cn/assets/2023-01/fgcpmFVpFo023023.png"],
    ["39", "https://img.kookapp.cn/assets/2023-01/YZN3GB3jXS023023.png"],
    ["40", "https://img.kookapp.cn/assets/2023-01/qBvSuZsIye023023.png"],
    ["41", "https://img.kookapp.cn/assets/2023-01/6kYE0U52Y4023023.png"],
    ["42", "https://img.kookapp.cn/assets/2023-01/ecMV37CVUm023023.png"],
    ["43", "https://img.kookapp.cn/assets/2023-01/zUmMJLimCw023023.png"],
    ["44", "https://img.kookapp.cn/assets/2023-01/ie6myAt9UW023023.png"],
    ["45", "https://img.kookapp.cn/assets/2023-01/1VEmARZA67023023.png"],
    ["46", "https://img.kookapp.cn/assets/2023-01/TGGAH7S7bW023023.png"],
    ["47", "https://img.kookapp.cn/assets/2023-01/N1GbPQwAJy023023.png"],
    ["48", "https://img.kookapp.cn/assets/2023-01/11SDWHRNJC023023.png"],
    ["49", "https://img.kookapp.cn/assets/2023-01/TfwMDnvQyw023023.png"],
    ["50", "https://img.kookapp.cn/assets/2023-01/9HmVSvEDU7023023.png"],
  ]);

export const translateRanking = (rank: string, rankDiv: string = "0") => {
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

export const translateCurrentState = (state: string): string => {

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