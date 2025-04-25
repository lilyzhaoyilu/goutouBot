import { AppCommand, AppFunc, BaseSession, TextMessage, Card } from 'kbotify';
import { STREAMER } from '../../utils/streamer_assets';
import { GoutouCard } from 'utils/goutou_card';
import { logger } from '../../utils/logger';

class ApexStreamers extends AppCommand {
  code = 's'; // 只是用作标记
  trigger = 's'; // 用于触发的文字
  help = '发送`.apex streamers`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'streamer');
    return session.replyCard(constructStreamerMenu());
  };
}

export const apexStreamers = new ApexStreamers();

const constructStreamerMenu = () => {
  const card = GoutouCard.baseCard();
  card.addTitle("查询主播菜单");
  for (const key in STREAMER) {
    if (!STREAMER[key].isShowingOnStreamerMenu) {
      continue;
    }
    buildStreamerSection(card, STREAMER[key].name, STREAMER[key].streamerName, STREAMER[key].avatar);
  }
  GoutouCard.addTailWantToQueryMoreStreamers(card);
  return card;
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
  );
}