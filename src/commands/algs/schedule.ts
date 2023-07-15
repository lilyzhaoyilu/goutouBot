import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from '../apex/helper_methods';

class AlgsSchedule extends AppCommand {
  code = 's'; // 只是用作标记
  trigger = 's'; // 用于触发的文字
  help = '发送`.algs s`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCard(), msg_id);
  };
}
export const algsSchedule = new AlgsSchedule();

const constructCard = () => {

  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle("ALGS比赛日程和规则");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**小组赛**\n7月14日 (星期五) 下午5:15 B组 vs. D组\n7月14日 (星期五) 下午9:30 A组 vs. D组\n7月15日 (星期六) 凌晨1:45 B组 vs. C组*(有DF 和 MDY-WHITE)*`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**淘汰赛**\n(font)7月15日 (星期六) 下午5:00 败者组第一轮(有DF 和 MDY-WHITE)(font)[warning]\n7月15日 (星期六) 下午9:15 胜者组\n(font)7月16日 (星期日) 凌晨01:30 败者组第二轮(有DF)(font)[warning]`
    }
  });
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**总决赛**\n7月16日 (星期日) 晚上11点 赛点制决赛\n7月17日 (星期一) 分赛2 // 季后赛 **总冠军诞生**`
    }
  });
  card.addTitle("比赛流程示意图 (点开查看) ")
  card.addImage("https://img.kookapp.cn/assets/2023-07/KyGItX3j7O0xp0ah.png");
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `数据来源自[NGA网友帖子](https://bbs.nga.cn/read.php?tid=36668968&rand=932) 感谢大老师提供\n想查询ALGS相关信息？用 \`.ALGS\``
    }
  });

  return card;
}