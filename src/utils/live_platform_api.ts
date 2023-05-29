//requests to Douyu, Bilibili and Huya
const axios = require('axios');
import * as cheerio from 'cheerio';

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

  static async getDouyinLiveData(room_number: number) {
    const response = await axios.get(`https://live.douyin.com/webcast/room/web/enter/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=en-US&cookie_enabled=true&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=113.0.0.0&web_rid=${room_number}&Room-Enter-User-Login-Ab=0&is_need_double_stream=false`, {
      headers: {
        "Host": "live.douyin.com",
        "Cookie": " ttwid=1%7CsNQyw6rqczRl5Am1vOYGUzKaFane7Mem0bykbWas17U%7C1680373537%7Caf697f98820791c3a819fc8b9b9b69711237a5d7ec808f19113da136e9424f0d",
      }
    });
    const data = response.data.data;

    // Kook limits image url length, so I have to trim some.
    const rawRoomThumb = data.data[0].cover?.url_list[0];
    let roomThumb = 'https://1000logos.net/wp-content/uploads/2019/06/Tiktok_Logo.png';
    if (rawRoomThumb) {
      const l = rawRoomThumb.indexOf("?");
      const r = rawRoomThumb.indexOf("x-expires");
      roomThumb = rawRoomThumb.slice(0, l + 1) + rawRoomThumb.slice(r);
    }

    const res: LiveData = { streamerName: data.user.nickname, roomName: data.data[0].title, url: `https://live.douyin.com/${room_number}`, isStreaming: data.room_status === 0, avatar: data.user.avatar_thumb.url_list[0], roomThumb: roomThumb }
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

  static async getHuyaLiveData(room_number: number) {
    const live_response = await axios.get(`https://www.huya.com/${room_number}`)
    const $ = cheerio.load(live_response.data);
    const $corgi: any = $('script').get()[9].children[0];
    const context = $corgi.data;

    const room_index = context.indexOf('TT_ROOM_DATA = ');
    const room_left = context.indexOf('{', room_index);
    const room_right = context.indexOf('}', room_index);
    const room_obj = JSON.parse(context.slice(room_left, room_right + 1));

    const profile_index = context.indexOf('TT_PROFILE_INFO = ');
    const profile_left = context.indexOf('{', profile_index);
    const profile_right = context.indexOf('}', profile_index);
    const profile_obj = JSON.parse(context.slice(profile_left, profile_right + 1));

    // yy 的图片库无法连接
    const roomThumb = room_obj.screenshot.includes("huyalive") ? room_obj.screenshot : "https://a.msstatic.com/huya/main3/static/img/logo.png";


    const res: LiveData = {
      streamerName: profile_obj.nick, roomName: room_obj.introduction, url: `https://www.huya.com/${room_number}`, isStreaming: room_obj.isOff ? false : true, avatar: profile_obj.avatar, roomThumb: roomThumb
    }
    return res;
  }
}