//requests to Douyu and Bilibili
const axios = require('axios');
export interface LiveData {
  streamerName: string,
  roomName: string,
  url: string,
  isStreaming: boolean,
  avatar: string,
  roomThumb: string,
}

export class LivePlatform {

  static async getDouyuLiveData(roomNumber: number) {
    const response = await axios.get(`http://open.douyucdn.cn/api/RoomApi/room/${roomNumber}`)
    const data = response.data.data;
    const res: LiveData = { streamerName: data.owner_name, roomName: data.room_name, url: `https://www.douyu.com/${roomNumber}`, isStreaming: data.online !== 0, avatar: data.avatar, roomThumb: data.room_thumb }
    return res
  }

  static async getBiliBiliLiveData(roomNumber: number) {
    const response = await axios.get(`http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomNumber}`)
    const data = response.data.data;
    // Bilibili has 2 for broadcasting recording
    const isStreaming = data.live_status !== 0 ? true : false;
    const res: LiveData = { streamerName: 'QQ', roomName: data.title, url: `https://live.bilibili.com/${roomNumber}`, isStreaming: isStreaming, avatar: 'https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg', roomThumb: data.user_cover }
    return res
  }
}