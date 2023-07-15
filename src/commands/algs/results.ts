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
    const data = await ApexLegendsStatus.getGroupStageResults(session);
    await normalSendOutCardWrapper(session, constructCard(data), msg_id);
  };
}
export const algsResults = new AlgsResults();


const constructCard = (data: any) => {
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
        "content": `${teamTextGenerator(name, rank, totalMatchesPlayed, totalPoints, highestGameKills, highestPlacement)}`
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
      "content": `数据来源自[Battlefy](https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2-playoffs/group-stage/leaderboard) 想查询ALGS相关信息？用 \`.ALGS\``
    }
  });
  return card;
}


const teamTextGenerator = (name: string, rank: number, totalMatchesPlayed: number, totalPoints: number, highestGameKills: number, highestPlacement: number) => {
  let content = "";
  content += `**${name}**`;
  content += ' '.repeat(20 - name.length);
  content += `#${rank} ${totalPoints}分\n上场${totalMatchesPlayed}次   最高排名:${highestPlacement}   最高单局击杀:${highestGameKills}`;
  return content;
}