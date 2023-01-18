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

  static async getDouyuLiveData(room_number: number) {
    const response = await axios.get(`http://open.douyucdn.cn/api/RoomApi/room/${room_number}`)
    const data = response.data.data;
    const res: LiveData = { streamerName: data.owner_name, roomName: data.room_name, url: `https://www.douyu.com/${room_number}`, isStreaming: data.online !== 0, avatar: data.avatar, roomThumb: data.room_thumb }
    return res
  }

  static async getBiliBiliLiveData(room_number: number, uid: number) {
    const live_response = await axios.get(`http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${room_number}`)
    const user_response = await axios.get(`https://api.live.bilibili.com/live_user/v1/Master/info?uid=${uid}`)
    const live_data = live_response.data.data;
    // Bilibili has 2 for broadcasting recording
    const is_streaming = live_data.live_status !== 0 ? true : false;
    const room_thumb = live_data.user_cover;
    const room_name = live_data.title;
    const streamer_name = user_response.data.data.info.uname;
    const avatar = user_response.data.data.info.face;

    const res: LiveData = { streamerName: streamer_name, roomName: room_name, url: `https://live.bilibili.com/${room_number}`, isStreaming: is_streaming, avatar: avatar, roomThumb: room_thumb }
    return res
  }
}