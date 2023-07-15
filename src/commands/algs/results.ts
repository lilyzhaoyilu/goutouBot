import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { TEAMS } from 'utils/team_assets';
import { normalSendOutCardWrapper } from '../apex/helper_methods';
import { ApexLegendsStatus } from '../../utils/apex_legends_status_api';

class AlgsResults extends AppCommand {
  code = 'r'; // 只是用作标记
  trigger = 'r'; // 用于触发的文字
  help = '发送`.algs r`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getBracketStageResult(session, 0, 0);
    await normalSendOutCardWrapper(session, constructBracketStageCard(data, "胜者组实时积分榜"), msg_id);
  };
}
export const algsResults = new AlgsResults();

class AlgsGroupResults extends AppCommand {
  code = 'gr'; // 只是用作标记
  trigger = 'gr'; // 用于触发的文字
  help = '发送`.algs gr`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getGroupStageResults(session);
    await normalSendOutCardWrapper(session, constructGroupResultsCard(data), msg_id);
  };
}
export const algsGroupResults = new AlgsGroupResults();

class AlgsLoser1Results extends AppCommand {
  code = 'lr1'; // 只是用作标记
  trigger = 'lr1'; // 用于触发的文字
  help = '发送`.algs lr1`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getBracketStageResult(session, 0, 1);
    await normalSendOutCardWrapper(session, constructBracketStageCard(data, "败者组第一轮实时积分榜"), msg_id);
  };
}
export const algsLoser1Results = new AlgsLoser1Results();

class AlgsLoser2Results extends AppCommand {
  code = 'lr2'; // 只是用作标记
  trigger = 'lr2'; // 用于触发的文字
  help = '发送`.algs lr2`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getBracketStageResult(session, 1, 2);
    await normalSendOutCardWrapper(session, constructBracketStageCard(data, "败者组第二轮实时积分榜"), msg_id);
  };
}
export const algsLoser2Results = new AlgsLoser2Results();

class AlgsWinnerResults extends AppCommand {
  code = 'wr'; // 只是用作标记
  trigger = 'wr'; // 用于触发的文字
  help = '发送`.algs winner`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getBracketStageResult(session, 0, 0);
    await normalSendOutCardWrapper(session, constructBracketStageCard(data, "胜者组实时积分榜"), msg_id);
  };
}
export const algsWinnerResults = new AlgsWinnerResults();

const constructBracketStageCard = (data: any, title: string) => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle(title);

  if (data.standings.length === 0) {
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `暂时还没有数据：比赛可能还没有开始，或者官网还没有更新。可以等几分钟再试一下。`
      }
    });
    return card;
  }

  // always 20 teams
  for (let i = 0; i < 20; i++) {
    const rank = i + 1;
    const team = data.standings[i]
    const name = team.name;
    const kills = team.kills;
    const points = team.points;

    const players = team.players;
    const playersArray = [];
    let content = `**${name}**  #${rank} ${points}分 ${kills}杀\n`;
    for (const player of players) {
      content += `${player.name}: ${player.kills} `
    }
    card.addModule({
      type: "section", text: {
        "type": "kmarkdown",
        "content": `${content}`
      },
      mode: "left",
      accessory: {
        "type": "image",
        "src": `${TEAMS[name] ? TEAMS[name].logo : "https://img.kookapp.cn/assets/2023-07/4GQUxZAoNZ02z02z.png"}`,
        "size": "sm"
      }
    });
  }

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `数据来源自[Battlefy](https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2-playoffs/bracket-stage/64518fc04eae2041b56bd449/) 想查询ALGS相关信息？用 \`.ALGS\``
    }
  });

  return card;
}

const constructGroupResultsCard = (data: any) => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle("小组赛积分");

  for (const d of data) {
    const name = d.name;
    const rank = d.rank;
    const totalMatchesPlayed = d.meta.totalMatchesPlayed;
    const totalPoints = d.meta.totalGamePoints;
    const highestGameKills = d.meta.highestGameKills;
    const highestPlacement = d.meta.highestPlacement;
    card.addModule({
      type: "section", text: {
        "type": "kmarkdown",
        "content": `${groupTeamTextGenerator(name, rank, totalMatchesPlayed, totalPoints, highestGameKills, highestPlacement)}`
      },
      mode: "left",
      accessory: {
        "type": "image",
        "src": `${TEAMS[name] ? TEAMS[name].logo : "https://img.kookapp.cn/assets/2023-07/4GQUxZAoNZ02z02z.png"}`,
        "size": "sm"
      }
    });
  }
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `数据来源自[Battlefy](https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2-playoffs/group-stage/leaderboard)\n想查询ALGS相关信息? 用 \`.ALGS\``
    }
  });
  return card;
}


const groupTeamTextGenerator = (name: string, rank: number, totalMatchesPlayed: number, totalPoints: number, highestGameKills: number, highestPlacement: number) => {
  let content = "";
  content += `**${name}**`;
  content += ' '.repeat(20 - name.length);
  content += `#${rank} ${totalPoints}分\n上场${totalMatchesPlayed}次   最高排名:${highestPlacement}   最高单局击杀:${highestGameKills}`;
  return content;
}