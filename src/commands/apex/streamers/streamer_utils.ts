const axios = require('axios');
import { bot } from 'init/client';
import { translateRanking } from '../apex_utils';
import auth from '../../../configs/auth';
interface LiveData {
  streamerName: string,
  roomName: string,
  url: string,
  isStreaming: boolean,
  avatar: string,
  roomThumb: string,
}

const getDouyuLiveData = async (roomNumber: string) => {
  const response = await axios.get(`http://open.douyucdn.cn/api/RoomApi/room/${roomNumber}`)
  const data = response.data.data;
  const res: LiveData = { streamerName: data.owner_name, roomName: data.room_name, url: `https://www.douyu.com/${roomNumber}`, isStreaming: data.online !== 0, avatar: data.avatar, roomThumb: data.room_thumb }
  return res
}

// hard coding
const getBiliBiliLiveData = async (roomNumber: string) => {
  const response = await axios.get(`http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomNumber}`)
  const data = response.data.data;
  // Bilibili has 2 for broadcasting recording
  const isStreaming = data.live_status !== 0 ? true : false;
  const res: LiveData = { streamerName: 'QQ', roomName: data.title, url: `https://live.bilibili.com/${roomNumber}`, isStreaming: isStreaming, avatar: 'https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg', roomThumb: data.user_cover }
  return res
}

const getPlayerInfo = async (playerId: string) => {
  try {
    const res = await axios.get(`https://api.mozambiquehe.re/bridge?auth=${auth.apexTracker}&player=${playerId}&platform=PC`)
    return res.data;
  } catch (err) {
    bot.API.message.create(9, '9682242694390929', `getPlayerInfo error: ${err}`);
    return '';
  }
}

const onlineStatusIndicator = (status: number) => {

  if (status === 1) {
    // green dot
    return "https://img.kookapp.cn/assets/2023-01/I5e3Sa5JPG00o00o.png";
  }
  // gray dot
  return "https://img.kookapp.cn/assets/2023-01/Hef2YX1h1Z00o00o.png";
}

const constructPlayerInfoCard = (data: any) => {
  if (data === '') {
    return `,{
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": "**查询账号遇到了错误。**"
      }
    }`
  }


  const br_rank = data.global.rank.ladderPosPlatform
  const areana_rank = data.global.arena.ladderPosPlatform;

  return `,{
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": "**${data.global.name}的数据**"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "paragraph",
      "cols": 3,
      "fields": [
        {
          "type": "kmarkdown",
          "content": "**账号信息**\\n在线:${data.realtime.isOnline === 1 ? " :heavy_check_mark:" : " :x:"}\\n账号等级:${data.global.level}"
        },
        {
          "type": "kmarkdown",
          "content": "**大逃杀排位** \\n${translateRanking(data.global.rank.rankName, data.global.rank.rankDiv)} \\n${br_rank === -1 ? "无排" : br_rank}名 \\n${data.global.rank.rankScore} RP"
        },
        {
          "type": "kmarkdown",
          "content": "**竞技场排位**\\n${translateRanking(data.global.arena.rankName, data.global.arena.rankDiv)} \\n${areana_rank === -1 ? "无排" : areana_rank}名 \\n${data.global.arena.rankScore} AP "
        }
      ]
    }
  }`
}

export const constructLiveCard = async (streamerRoomNumber: string, isDouyuStreamer = true, playerId: string) => {
  const res = isDouyuStreamer ? await getDouyuLiveData(streamerRoomNumber) : await getBiliBiliLiveData(streamerRoomNumber);
  const streamingText = res.isStreaming ? "*直播中*" : "暂未开播";

  let resCard = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": "[${res.streamerName}的直播间](${res.url})  ${streamingText}"
    },
    "mode": "left",
    "accessory": {
      "type": "image",
      "src": "${res.avatar}",
      "size": "lg"
    }
  }`

  let liveCard = '';
  if (res.isStreaming) {
    // 有承接的逗号，结尾没有逗号
    liveCard = `,{
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": "${res.roomName}"
      }
    },
    {
      "type": "container",
      "elements": [
        {
          "type": "image",
          "src": "${res.roomThumb}"
        }
      ]
    }`
  }

  const infoData = await getPlayerInfo(playerId);
  console.log(infoData);

  const tailCard = "]}]"


  return resCard + liveCard + constructPlayerInfoCard(infoData) + tailCard;
}





// https://img.kookapp.cn/assets/2023-01/I5e3Sa5JPG00o00o.png  greendot
// https://img.kookapp.cn/assets/2023-01/Hef2YX1h1Z00o00o.png graydot
