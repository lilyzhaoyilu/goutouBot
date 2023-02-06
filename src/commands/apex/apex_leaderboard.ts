import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { StringTranslation } from 'utils/string_translation';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { RANK_TO_IMAGE } from 'utils/assets';
import { normalSendOutCardWrapper } from './helper_methods';
class ApexTopFifty extends AppCommand {
  code = 'top_fifty'; // 只是用作标记
  trigger = 'top50'; // 用于触发的文字
  help = '发送`.apex top50`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getLeaderBoard(session);
    const card: Card = data instanceof Card ? data : buildLeaderboardCard(data, 'fifty');
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
    const data = await ApexLegendsStatus.getLeaderBoard(session);
    const card: Card = data instanceof Card ? data :
      buildLeaderboardCard(data, 'ten');
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

export const apexTopFifty = new ApexTopFifty();
export const apexTopTen = new ApexTopTen();



const buildLeaderboardCard = (data: any, option: string = 'ten') => {
  const latestUpdate = StringTranslation.convertEpochToDate(data.meta.lastUpdate);
  const numberOfPlayers = Number(data.meta.numberOfPlayers);
  switch (option) {
    case "fifty":
      let total = numberOfPlayers < 50 ? numberOfPlayers : 50;
      return buildTopFiftyCard(data, total);
    case "ten":
      let total2 = numberOfPlayers < 10 ? numberOfPlayers : 10;
      return buildTopTenCard(data, total2);
    default:
      return buildBaseCard().addText("error");
  }
}

const buildPlayersSection = (card: Card, rank: string, id: string, points: string, total: number): Card => {
  card.addText(`ID: **${StringTranslation.streamerSuperLink(id)}** \n分数: ${points}`, true, "left", {
    type: "image",
    src: `${RANK_TO_IMAGE.get(rank)}`,
    size: "lg"
  })
  return card;
}

const buildTopFiftyCard = (data: any, total: number = 50) => {
  let card = buildBaseCard();
  for (let i = 0; i < total; i++) {
    const playerInfo = data.data[i];
    buildPlayersSection(card, (i + 1).toString(), playerInfo.name, playerInfo.value, total);
  }
  return card;
}

const buildTopTenCard = (data: any, total: number = 10) => {
  let card = buildBaseCard();
  card.addTitle("Apex大逃杀榜单（PC端）");
  for (let i = 0; i < total; i++) {
    const playerInfo = data.data[i];
    buildPlayersSection(card, (i + 1).toString(), playerInfo.name, playerInfo.value, total);
  }

  card.addText("如果榜上有国内主播，并且他的名字没有连接到直播间的请私信机器人。第一个私信的赠送通行证升级码或者其他小礼物。主播们改名字太快了:sob:", true)
  card.addText(`数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com](https://apexlegendsstatus.com)`)
  card.addModule({
    type: "context", elements: [`最后更新于 北京时间 ${StringTranslation.convertEpochToDate(data.meta.lastUpdate)}`]
  })
  return card;
}


const buildBaseCard = (): Card => {
  const card = new Card();
  card.setSize("lg");
  card.setTheme("secondary");
  return card;
}