import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { TEAMS } from 'utils/team_assets';
import { normalSendOutCardWrapper } from '../apex/helper_methods';
import { ApexLegendsStatus } from '../../utils/apex_legends_status_api';
import * as cheerio from 'cheerio';

class AlgsPlayersData extends AppCommand {
  code = 'players'; // 只是用作标记
  trigger = 'players'; // 用于触发的文字
  help = '发送`.algs player`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getALGSPlayerData(session);
    await normalSendOutCardWrapper(session, constructCard(data), msg_id);
  };
}
export const algsPlayersData = new AlgsPlayersData();

interface PlayerPerformance {
  name: string;
  games: number;
  kills: number;
  assists: number;
  knocks: number;
  kad: number;
}
const constructCard = (data: any) => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle("部分选手比赛数据 (按击杀排序)");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `名字                        局数  击杀  助攻  击倒  KA/D`
    }
  });
  const sortedPlayers = parsePlayerData(data);
  for (let i = 0; i < 40; i++) {
    constructPlayerSection(sortedPlayers[i], card);
  }

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `查看所有选手数据请用[ApexLegendsStatus](https://apexlegendsstatus.com/algs/Y3-Split2/ALGS-Playoffs/Global/Overview#statsPlayers), Kook只能显示前40位~ \n想查询ALGS相关信息？用 \`.ALGS\`\n这个真的有人看吗? 没有人看的话就不更新啦...`
    }
  });

  return card;
}

const constructPlayerSection = (player: PlayerPerformance, card: Card) => {
  let content = `${player.name}`;
  content += " ".repeat(25 - player.name.length);
  content += `${player.games}  ${player.kills}  ${player.assists}  ${player.knocks}  ${player.kad}`

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `${content}`
    }
  });
}


const parsePlayerData = (data: any): PlayerPerformance[] => {
  const players = [];
  const $ = cheerio.load(data);

  let $curPlayerInfo = $("#playersStatsTable > tbody tr:first");

  // Supposed to be below but too dangerous
  // Remember to add more numbers when new members
  // while ($curPlayerInfo.length != 0) {

  for (let i = 0; i < 121; i++) {


    const curPlayerArray = $curPlayerInfo.find("td").map((_, el) => $(el).text()).get();

    // Index based on website column
    const player: PlayerPerformance = {
      name: curPlayerArray[0],
      games: Number(curPlayerArray[1]),
      kills: Number(curPlayerArray[2]),
      assists: Number(curPlayerArray[3]),
      knocks: Number(curPlayerArray[4]),
      kad: Number(curPlayerArray[11])
    }
    players.push(player);
    $curPlayerInfo = $curPlayerInfo.next();
  }

  // from high -> low based on kills
  players.sort((a, b) => b.kills - a.kills);
  return players;
}