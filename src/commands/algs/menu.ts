import { MenuCommand, Card } from 'kbotify';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team } from 'utils/team_assets';
import { groupA, groupB, groupC, groupD } from './groups';



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

  card.addTitle("ALGS比赛时间(Group Stage) 北京时间");

  constructScheduleSection(card);

  card.addTitle("ALGS比赛分组(Group Stage) -- C组");
  constructTeamSection(card, GROUPC);
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `查看其它分组请用\n\`.algs A\` 查看A组\n\`.algs B\` 查看B组\n\`.algs C\` 查看C组\n\`.algs D\` 查看D组`
    }
  })

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `想看其它ALGS的信息？请私信狗头`
    }
  });

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `数据来源自[battlefy](https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2-playoffs/teams)`
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

export const algsMenu = new AlgsMenu(groupA, groupB, groupC, groupD);