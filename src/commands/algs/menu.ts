import { MenuCommand, Card } from 'kbotify';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team } from 'utils/team_assets';
import { groupA, groupB, groupC, groupD, groupLosers, groupWinners } from './groups';
import { algsResults, algsGroupResults, algsLoser1Results, algsLoser2Results, algsWinnerResults, algsFinalResults } from './results';
import { algsSchedule } from './schedule';
import { algsPlayersData } from './player_data';
import { algsDrop } from './drop';


export const constructTeamSection = (card: Card, teams: Team[]) => {

  for (let team of teams) {
    card.addModule({
      type: "section", text: {
        "type": "kmarkdown",
        "content": `**${team.name}**\n${team.members.join(", ")}`
      },
      mode: "left",
      accessory: {
        "type": "image",
        "src": `${team.logo}`,
        "size": "sm"
      }
    });
  }
}

const constructCard = () => {
  const card = new Card().setSize("lg").setTheme("secondary");

  card.addTitle("ALGS 相关指令");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看积分**`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。积分\`或\`.algs r\` (**r**esults) 最近比赛积分和队伍排名(实时更新) `
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。小组积分\`或\`.algs gr\` (**g**roup **r**esults) 小组赛积分和排名`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。败者组1积分\`或\`.algs lr2\` (**l**oser **r**esults **1**) 败者组1 积分和排名`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。败者组2积分\`或\`.algs lr2\` (**l**oser **r**esults **2**) 败者组2 积分和排名`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。胜者组积分\`或\`.algs wr\` (**w**inner **r**esults) 胜者组积分和排名`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。决赛积分\`或\`.algs fr\` (**f**inal **r**esults) 决赛积分和排名`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。跳点\`或\`.algs d\` (**d**rop) 获取跳点图`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `\`。赛程\`或\`.algs s\`**查看赛程**`
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看选手数据统计**\`.algs players\`或 \`。选手\``
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看分组**\n\`.胜者组\`或\`.algs winners\` 查看胜者组\n\`.败者组\`或\`.algs losers\` 查看败者组\n\`.algs a\` 查看A组\n\`.algs b\` 查看B组\n\`.algs c\` 查看C组\n\`.algs d\` 查看D组`
    }
  })
  card.addTitle("ALGS 简讯");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `DF进入败者组第二轮, MDY-WHITE 遗憾离场. 如果DF能再次前十, 就可以继续晋级. \n可以用\`。积分\`查看更多队伍积分 \n可以用\`。选手\`查看更多选手表现.\n狗头于7月16日 凌晨报道`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `想看其它ALGS的信息？请私信狗头\nALGS信息真的有人看吗? 没有人看的话就不更新啦...`
    }
  });
  return [card];
}


class AlgsMenu extends MenuCommand {
  code = 'algs'; // 只是用作标记
  trigger = 'algs'; // 用于触发的文字
  help = '发送`.algs`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  // func: AppFunc<BaseSession> = async (session) => {
  //   const msg_id = await GoutouCard.sendQueringCard(session);
  //   await normalSendOutCardWrapper(session, constructCard(), msg_id);
  // };
  menu = constructCard();
  useTempMenu = false;
  useCardMenu = true; // 使用卡片菜单
}

export const algsMenu = new AlgsMenu(groupA, groupB, groupC, groupD, algsResults, algsSchedule, algsPlayersData, groupLosers, groupWinners, algsGroupResults, algsLoser1Results, algsLoser2Results, algsWinnerResults, algsFinalResults, algsDrop);