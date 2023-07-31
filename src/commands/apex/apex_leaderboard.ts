import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { StringTranslation } from 'utils/string_translation';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { RANK_TO_IMAGE } from 'utils/assets';
import { normalSendOutCardWrapper } from './helper_methods';
import { Streamer } from '../../utils/streamer_handler';
import * as cheerio from 'cheerio';

class ApexTopFifty extends AppCommand {
  code = 'top_fifty'; // 只是用作标记
  trigger = 'top50'; // 用于触发的文字
  help = '发送`.apex top50`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getLiveLeaderboard(session);
    const card: Card = data instanceof Card ? data :
      buildLiveLeaderboardCard(data.data, 50);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

class ApexTopTen extends AppCommand {
  code = 'top_ten'; // 只是用作标记
  trigger = 'top10'; // 用于触发的文字
  help = '发送`.apex top10`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getLiveLeaderboard(session);
    const card: Card = data instanceof Card ? data :
      buildLiveLeaderboardCard(data.data, 10);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

export const apexTopFifty = new ApexTopFifty();
export const apexTopTen = new ApexTopTen();

const buildLiveLeaderboardCard = (data: any, option: number = 10) => {
  const $ = cheerio.load(data);
  const $tbody = $('tbody');
  let $line = $tbody.find('tr:first');

  const card = GoutouCard.baseCard();
  for (let i = 0; i < option; i++) {
    const $firstItem = $line.find('td:first');
    const rank = $firstItem.text();
    const $thirdItem = $firstItem.next().next();
    const name = $thirdItem.find('a').text();
    const hyperlink = $thirdItem.find('a').attr("href");

    let uid: string = '';
    if (hyperlink) {
      uid = hyperlink.slice(hyperlink.lastIndexOf('/') + 1);
    }
    const score = $thirdItem.next().find('span').text();

    buildPlayersSection(card, rank, name, score, uid)
    $line = $line.next();
  }

  if (option === 10) {
    card.addText("如果前 50 榜上有国内主播, 并且他的名字没有连接到直播间, 请私信机器人。第一个私信的赠送通行证升级码或者其他小礼物。:smiling_face_with_hearts:", true)
    card.addText(`数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com/live-ranked-leaderboards/Battle_Royale/PC](https://apexlegendsstatus.com/live-ranked-leaderboards/Battle_Royale/PC)`)
  }

  return card;
}

const buildPlayersSection = (card: Card, rank: string, name: string, points: string, uid?: string): Card => {
  name = name ? name : "该用户选择隐藏自己的信息 或 该用户不存在";
  points = points ? points : "无";
  let displayName = StringTranslation.rankBoardBlockedNames(name);
  const hyperLink = Streamer.addStreamerRoomLinkBasedOnUid(uid);

  if (name != "该用户选择隐藏自己的信息 或 该用户不存在" && displayName != "此id被屏蔽无法显示" && hyperLink) {
    displayName = `[${displayName}](${hyperLink})`;
  }

  card.addText(`ID: **${displayName}** \n分数: ${points}`, true, "left", {
    type: "image",
    src: `${RANK_TO_IMAGE.get(rank)}`,
    size: "lg"
  })
  return card;
}