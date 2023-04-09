import { AppCommand, AppFunc, BaseSession, TextMessage, Card } from 'kbotify';
import { STREAMER } from '../../utils/streamer_assets';

class ApexStreamers extends AppCommand {
  code = 's'; // 只是用作标记
  trigger = 's'; // 用于触发的文字
  help = '发送`.apex streamers`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    return session.replyCard(constructStreamerMenu());
  };
}

export const apexStreamers = new ApexStreamers();

const constructStreamerMenu = () => {
  const card = new Card().setSize('lg').setTheme('secondary');
  card.addTitle("快速查询主播");
  for (const key in STREAMER) {
    if (!STREAMER[key].isShowingOnStreamerMenu) {
      continue;
    }
    buildStreamerSection(card, STREAMER[key].name, STREAMER[key].streamerName, STREAMER[key].avatar);
  }
  buildStreamerMenuTail(card);
  return card;
}



const buildStreamerMenuTail = (card: Card) => {
  card.addModule({
    "type": "context",
    "elements": [
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      },
      {
        "type": "plain-text",
        "content": "如果还有其他你想看到的主播，请私信狗头哦~"
      },
      {
        "type": "image",
        "src": "https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png"
      }
    ]
  })
}

const buildStreamerSection = (card: Card, name: string, streamerName: string, avatar: string) => {
  card.addModule({
    type: "section", text: {
      "type": "kmarkdown",
      "content": `\`.apex ${name}\` 查询**${streamerName}**的账号和直播间`
    },
    mode: "left",
    accessory: {
      "type": "image",
      "src": `${avatar}`,
      "size": "lg"
    }
  }
  )
}

// https://img.kookapp.cn/assets/2023-01/BWDWRd1Pm2035035.png