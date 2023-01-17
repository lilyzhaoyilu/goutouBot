// streamer assets

export interface StreamerAsset {
  name: string;
  origin_id: string;
  platform: "douyu" | "bilibili";
  roomNumber: number;
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
  name: "pite",
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

export const STREAMER: Record<string, StreamerAsset> = {
  "3mz": SANMINGZHI,
  "Pite": PITE,
  "Roieee": ROIEEE,
}
