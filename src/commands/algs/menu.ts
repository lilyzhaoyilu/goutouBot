import { MenuCommand, Card } from 'kbotify';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team } from 'utils/team_assets';
import { groupA, groupB, groupC, groupD } from './groups';
import { algsResults } from './results';
import { algsSchedule } from './schedule';
import { algsPlayerData } from './player_data';



const schedule = ["7月13日 下午5:15 C组 *(有DF 和 MDY-WHITE)* vs. D组", "7月13日 下午9:30 A组 vs. B组", "7月14日 凌晨1:45 A组 vs. C组*(有DF 和 MDY-WHITE)*", "7月14日 下午5:15 B组 vs. D组", "7月14日 下午9:30 A组 vs. D组", "7月15日 凌晨1:45 B组 vs. C组*(有DF 和 MDY-WHITE)*"]

const constructScheduleSection = (card: Card) => {
  for (const s of schedule) {
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `${s}`
      }
    })
  }
}

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
      "content": `**查看小组赛积分和排名(实时更新)**\`.algs r\`或 \`.积分\``
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看赛程**\`.algs s\`或 \`.赛程\``
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看选手数据统计**\`.algs player\`或 \`.选手\``
    }
  })
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**查看分组**\n\`.algs a\` 查看A组\n\`.algs b\` 查看B组\n\`.algs c\` 查看C组\n\`.algs d\` 查看D组`
    }
  })
  card.addTitle("ALGS 简讯");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `TSM第一, Alliance第二. DreamFire 第26, MDY-WHITE 第30. 两只中国队伍都会进入败者组比赛. 败者组比赛分两场, 每场比赛的前十支队伍会进入到下一轮.\n可以用\`。积分\`查看更多队伍积分。\n百弟在击杀榜上排名第30, 皮特(差不多) 紧随其后. \n可以用\`。选手\`查看更多选手表现.\n狗头于7月15日 上午11点报道`
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

export const algsMenu = new AlgsMenu(groupA, groupB, groupC, groupD, algsResults, algsSchedule, algsPlayerData);