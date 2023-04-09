// streamer assets

export interface StreamerAsset {
  name: string;
  streamerName: string; // for displaying apex_streamers/ 快速主播 menu
  platform: "douyu" | "bilibili" | "douyin" | "huya";
  roomNumber: number;
  biliUid?: number; // platform = bilibili时必填
  avatar: string;
  eaInfo?: EaInfo;
  customized?: Customization;
  isShowingOnStreamerMenu: boolean;
}

interface EaInfo {
  id?: string;
  uid?: string;
}

interface Customization {
  sloganText?: string;
  sloganImage?: string;
  textStreaming?: string;
  textOffline?: string;
}

const SANMINGZHI: StreamerAsset = {
  name: "3mz",
  streamerName: "一口三明治3Mz",
  eaInfo: {
    // id: "DF_3Mz_o",
    id: "DF_3mz4090",
    uid: "1003597319170", // DF_3mz4090
  },
  platform: "douyu",
  roomNumber: 1667826,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202209/d5b9d408f15f44129094fe2c8d51e7ee_big.jpg",
  customized: {
    textOffline: "倒地不起",
    sloganImage: "https://img.kookapp.cn/assets/2023-01/XALKdJTw6802g02g.png",
    sloganText: "三明治~~~~~~~!  为什么会倒~~~~~~!"
  },
  isShowingOnStreamerMenu: true
}

const PITE: StreamerAsset = {
  name: "pite",
  streamerName: "皮特174",
  eaInfo: {
    id: "DF_174_o",
    uid: "1005925886332"
  },
  platform: "douyu",
  roomNumber: 5684726,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202107/573dc76d4d7e4994b6b55e1df28d72b0_big.jpg",
  isShowingOnStreamerMenu: true
}

const ROIEEE: StreamerAsset = {
  name: "roieee",
  streamerName: "Roieee百弟DF",
  eaInfo: {
    id: "DF_Roieee_o",
    uid: "1009332336890",
  },
  platform: "douyu",
  roomNumber: 10722927,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202203/f08daf1b788643b791954ee6b5af50c7_big.jpg",
  customized: {
    sloganImage: "https://img.kookapp.cn/assets/2023-01/s2CDsNecvF02b02b.png",
    sloganText: "你罩子交給他幹嘛阿 ~~~~! @#$@%@$%#%&^$ "
  },
  isShowingOnStreamerMenu: true
}

const JACKY: StreamerAsset = {
  name: "jacky",
  streamerName: "Jackyar",
  eaInfo: {
    id: "AGL_Jacky1",
    uid: "1004874025016",
  },
  platform: "douyu",
  roomNumber: 6490082,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202107/e3170c90309547b5bb0bc38b8cae0a16_middle.jpg",
  customized: {
    sloganText: "黑丝妹妹加我，阿里嘎多！"
  },
  isShowingOnStreamerMenu: true
}

const KUKU: StreamerAsset = {
  name: "kuku",
  streamerName: "库库_sama",
  eaInfo: {
    id: "LG_notKuku",
    uid: "1012805591521",
  },
  platform: "bilibili",
  roomNumber: 5194110,
  biliUid: 5408366,
  avatar: "https://i2.hdslb.com/bfs/face/22c40d9f5569da64fc3a2a2c8e219fed38722c6d.jpg",
  isShowingOnStreamerMenu: true
}

const QQ: StreamerAsset = {
  name: "qq",
  streamerName: "Qq",
  eaInfo: {
    id: "AGL_QQ-w-",
    uid: "1009358754932",
  },
  platform: "bilibili",
  roomNumber: 26161543,
  biliUid: 3461575992150130,
  avatar: "https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg",
  isShowingOnStreamerMenu: true
}

const FEIJU: StreamerAsset = {
  name: "feiju",
  streamerName: "飞天狙",
  eaInfo: {
    id: "MDY_FeiJu",
    uid: "1005513616741",
  },
  platform: "bilibili",
  roomNumber: 23197314,
  biliUid: 51628309,
  avatar: "https://i1.hdslb.com/bfs/face/6a63e73ed7a9c85744df88c3db6d866b7b6e9fe2.jpg",
  customized: {
    sloganImage: "https://img.kookapp.cn/assets/2023-04/QVGwNM6f6G02o02o.png",
    sloganText: "怎么会被8滴血反杀！！￥#￥#@%@￥%#￥%#￥…………&…………"
  },
  isShowingOnStreamerMenu: true
}

// MDY 老吊
const LAODIAO: StreamerAsset = {
  name: "laodiao",
  streamerName: "老吊QuQ",
  platform: "bilibili",
  roomNumber: 23097212,
  biliUid: 404145981,
  avatar: "https://i1.hdslb.com/bfs/face/56aff59eb6a4ab68dbf1a029fa2161b912fcce48.jpg",
  isShowingOnStreamerMenu: true
}

const LIZHI: StreamerAsset = {
  name: "lizhi",
  streamerName: "荔枝Kouun",
  eaInfo: {
    id: "HNP_KOuun",
    uid: "1007935567730",
  },
  platform: "bilibili",
  roomNumber: 22734699,
  biliUid: 345564775,
  avatar: "https://i1.hdslb.com/bfs/face/d92ff20bf8c468e6f1fdf129fc75d81962989dd9.jpg",
  isShowingOnStreamerMenu: true
}

const XIAORE: StreamerAsset = {
  name: "xiaore",
  streamerName: "小惹",
  eaInfo: {
    id: "Returnx_O",
    uid: "1012206702056",
  },
  platform: "douyin",
  roomNumber: 473517342949,
  avatar: "https://p3.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_810f5b33e6d5232d16dac0c74417fa39.jpeg",
  isShowingOnStreamerMenu: false,
}

const YOULING: StreamerAsset = {
  name: "youling",
  streamerName: "YouL1ngTxT",
  eaInfo: {
    id: "Vk_MDY_QYouL1ngQ",
    uid: "1009129900640",
  },
  platform: "bilibili",
  roomNumber: 5851637,
  biliUid: 160798980,
  avatar: "https://i1.hdslb.com/bfs/face/be130812b60c63f2ef48df00cb55503ad62674cb.jpg",
  isShowingOnStreamerMenu: true
}

// const JIEPAI: StreamerAsset = {
// }

const TIANYAO: StreamerAsset = {
  name: "tianyao",
  streamerName: "甜药Jamren",
  eaInfo: {
    id: "MDYW_Jamren",
    uid: "1007716701440",
  },
  platform: "bilibili",
  roomNumber: 13308358,
  biliUid: 106017013,
  avatar: "https://i1.hdslb.com/bfs/face/cb2a3fce4296d6e3ed74e3a7070071067e4422b7.jpg",
  isShowingOnStreamerMenu: true
}

export const STREAMER: Record<string, StreamerAsset> = {
  "3mz": SANMINGZHI,
  "pite": PITE,
  "roieee": ROIEEE,
  "jacky": JACKY,
  "kuku": KUKU,
  "qq": QQ,
  "feiju": FEIJU,
  "laodiao": LAODIAO,
  "lizhi": LIZHI,
  "youling": YOULING,
  "tianyao": TIANYAO,
  "xiaore": XIAORE,
}

const createUidToStreamer = (): Record<string, StreamerAsset> => {
  const res: Record<string, StreamerAsset> = {};
  for (const name in STREAMER) {
    if (STREAMER[name]?.eaInfo?.uid) {
      res[STREAMER[name]?.eaInfo?.uid as string] = STREAMER[name]
    }
  }
  return res;
}

export const UidToStreamerAsset = createUidToStreamer();
