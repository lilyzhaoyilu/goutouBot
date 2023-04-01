// streamer assets

export interface StreamerAsset {
  name: string;
  origin_id: string;
  platform: "douyu" | "bilibili";
  roomNumber: number;
  biliuid?: number; // platform = bilibili时必填
  avatar?: string;
  customized?: Customization;
}

interface Customization {
  sloganText?: string;
  sloganImage?: string;
  textStreaming?: string;
  textOffline?: string;
}

const SANMINGZHI: StreamerAsset = {
  name: "3mz",
  origin_id: "DF_3Mz_o",
  platform: "douyu",
  roomNumber: 1667826,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202209/d5b9d408f15f44129094fe2c8d51e7ee_big.jpg",
  customized: {
    textOffline: "倒地不起",
    sloganImage: "https://img.kookapp.cn/assets/2023-01/XALKdJTw6802g02g.png",
    sloganText: "三明治~~~~~~~!  为什么会倒~~~~~~!"
  }
}

const PITE: StreamerAsset = {
  name: "Pite",
  origin_id: "DF_174_o",
  platform: "douyu",
  roomNumber: 5684726,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202107/573dc76d4d7e4994b6b55e1df28d72b0_big.jpg",
}

const ROIEEE: StreamerAsset = {
  name: "Roieee",
  origin_id: "DF_Roieee_o",
  platform: "douyu",
  roomNumber: 10722927,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202107/573dc76d4d7e4994b6b55e1df28d72b0_big.jpg",
  customized: {
    sloganImage: "https://img.kookapp.cn/assets/2023-01/s2CDsNecvF02b02b.png",
    sloganText: "你罩子交給他幹嘛阿 ~~~~! @#$@%@$%#%&^$ "
  }
}

const JACKY: StreamerAsset = {
  name: "Jacky",
  origin_id: "AVG_Jacky1",
  platform: "douyu",
  roomNumber: 6490082,
  avatar: "https://apic.douyucdn.cn/upload/avatar_v3/202107/e3170c90309547b5bb0bc38b8cae0a16_big.jpg",
  customized: {
    sloganText: "黑丝妹妹加我，阿里嘎多！"
  }
}

const KUKU: StreamerAsset = {
  name: "Kuku",
  origin_id: "LG_notKuku",
  platform: "bilibili",
  roomNumber: 5194110,
  biliuid: 5408366,
  avatar: "https://i2.hdslb.com/bfs/face/22c40d9f5569da64fc3a2a2c8e219fed38722c6d.jpg",
}

const QQ: StreamerAsset = {
  name: "Qq",
  origin_id: "AGL_QQ-w-",
  // origin_id: "MS_QQ_Banxia-u-",
  platform: "bilibili",
  roomNumber: 26161543,
  biliuid: 3461575992150130,
  avatar: "https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg",
}

const FEIJU: StreamerAsset = {
  name: "Feiju",
  origin_id: "MDY_FeiJu",
  platform: "bilibili",
  roomNumber: 23197314,
  biliuid: 51628309,
  avatar: "https://i1.hdslb.com/bfs/face/6a63e73ed7a9c85744df88c3db6d866b7b6e9fe2.jpg",
}

export const STREAMER: Record<string, StreamerAsset> = {
  "3mz": SANMINGZHI,
  "Pite": PITE,
  "Roieee": ROIEEE,
  "Jacky": JACKY,
  "Kuku": KUKU,
  "Qq": QQ,
  "Feiju": FEIJU,
}