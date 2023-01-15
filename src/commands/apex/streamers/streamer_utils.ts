const axios = require('axios');
import { bot } from 'init/client';
import { translateRanking, translateCurrentState } from '../apex_utils';
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
    const res = await axios.get(`https://api.mozambiquehe.re/bridge?auth=${auth.apexTracker}&player=${playerId}&platform=PC&enableClubsBeta=true&merge=true&removeMerged=true`)
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
  const club_name = data.club?.name === undefined ? '' : data.club.name;

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
          "content": "**账号信息** \\n等级:${data.global.level} \\n状态:${translateCurrentState(data.realtime.currentState)} \\n俱乐部:${club_name}"
        },
        {
          "type": "kmarkdown",
          "content": "**大逃杀排位** \\n${translateRanking(data.global.rank.rankName, data.global.rank.rankDiv)} \\n${br_rank === -1 ? "无排" : br_rank}名 \\n${data.global.rank.rankScore} RP"
        },
        {
          "type": "kmarkdown",
          "content": "**竞技场排位** \\n${translateRanking(data.global.arena.rankName, data.global.arena.rankDiv)} \\n${areana_rank === -1 ? "无排" : areana_rank}名 \\n${data.global.arena.rankScore} AP "
        }
      ]
    }
  }`
}

const buildCustomizedStreamingTest = (isStreaming: boolean, isSanMingZhi: boolean = false) => {
  if (isStreaming) {
    return "*直播中*";
  } else {
    if (isSanMingZhi) {
      return "倒地不起";
    } else {
      return "暂未开播";
    }
  }
}

export const constructLiveCard = async (streamerRoomNumber: string, isDouyuStreamer: boolean = true, playerId: string) => {
  const res = isDouyuStreamer ? await getDouyuLiveData(streamerRoomNumber) : await getBiliBiliLiveData(streamerRoomNumber);
  const streamingText = buildCustomizedStreamingTest(res.isStreaming, streamerRoomNumber === "1667826");

  let sanmingzhi = `,{
    "type": "context",
    "elements": [
               {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/XALKdJTw6802g02g.png"
      },
      {
        "type": "plain-text",
        "content": "三明治~~~~~~~!  为什么会倒~~~~~~!"
      }
    ]
  }`

  let roieee = `,{
    "type": "context",
    "elements": [
               {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/s2CDsNecvF02b02b.png"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/s2CDsNecvF02b02b.png"
      },
      {
        "type": "plain-text",
        "content": "你罩子交給他幹嘛阿 ~~~~! @#$@%@$%#%&^$ "
      }
    ]
  }`

  let headCard = `[
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

  if (streamerRoomNumber === "1667826") {
    headCard += sanmingzhi;
  }
  if (streamerRoomNumber === "10722927") {
    headCard += roieee;
  }

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

  const tailCard = `,{
    "type": "context",
    "elements": [
               {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": "使用 .apex s 查看快速查询的主播列表"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }
    ]
  },{
    "type": "context",
    "elements": [
               {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": "新春快乐！如果还有其他你想看到的主播，请私信狗头哦~"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }
    ]
  }]}]`


  return headCard + liveCard + constructPlayerInfoCard(infoData) + tailCard;
}





// https://img.kookapp.cn/assets/2023-01/I5e3Sa5JPG00o00o.png  greendot
// https://img.kookapp.cn/assets/2023-01/Hef2YX1h1Z00o00o.png graydot
