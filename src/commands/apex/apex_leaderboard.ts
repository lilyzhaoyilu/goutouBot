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
    session.replyCard(buildLeaderboardNote());
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
    // session.replyCard(buildLeaderboardNote());
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

  const card = buildBaseCard();
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
    card.addText("如果榜上有国内主播，并且他的名字没有连接到直播间的请私信机器人。第一个私信的赠送通行证升级码或者其他小礼物。主播们改名字太快了:sob:", true)
    card.addText(`数据由Apex Legends Stats 提供: [https://apexlegendsstatus.com](https://apexlegendsstatus.com)`)
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

const buildBaseCard = (): Card => {
  const card = new Card().setSize("lg").setTheme("secondary");
  return card;
}

const buildLeaderboardNote = (): Card => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle("排行榜无法显示用户说明");
  card.addText("今天(4/9 PDT)跟 apexlegendsstatus (Apex 主流数据库之一) 的维护者确认过了，现在这些不能显示的账号没有在 Apex Legends 服务器的数据库中，也没有在任何其他的查询网站上显示。");
  card.addText("排行榜无法显示账号信息的原因一般有三个:")
  card.addText("1.账号刚封禁但是排行榜还没有更新（账号被封禁了之后会被从排行榜上剔除）。");
  card.addText("2.账号拥有者向 Apex Legends 数据库发送遵从通用数据保护条例(GDPR)条例的隐私保护, 请求不显示自己的账号信息。");
  card.addText("3.新的账号且没有被查询过，需要等有人查询一下之后账号信息才会被抓取。");
  card.addText("apexlegendsstatus的维护者们表示现在这些无法显示的账号很有可能不是正常的账号, 因为一般榜上的猎杀账号都会被查询并且加入数据库。这些无法显示的账号应该是新的账号(因为没有人查过)并且在作弊。这是一个非常奇怪的bug。");
  card.addText("所以前几天 **QQ确实是世一猎哦** !");
  return card;
}