import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from '../apex/helper_methods';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team } from 'utils/team_assets';
import { constructTeamSection } from './menu';

class GroupA extends AppCommand {
  code = 'a'; // 只是用作标记
  trigger = 'a'; // 用于触发的文字
  help = '发送`.algs a`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCardA(), msg_id);
  };
}
export const groupA = new GroupA();

class GroupB extends AppCommand {
  code = 'b'; // 只是用作标记
  trigger = 'b'; // 用于触发的文字
  help = '发送`.algs b`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCardB(), msg_id);
  };
}
export const groupB = new GroupB();

class GroupC extends AppCommand {
  code = 'c'; // 只是用作标记
  trigger = 'c'; // 用于触发的文字
  help = '发送`.algs c`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCardC(), msg_id);
  };
}
export const groupC = new GroupC();

class GroupD extends AppCommand {
  code = 'd'; // 只是用作标记
  trigger = 'd'; // 用于触发的文字
  help = '发送`.algs d`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCardD(), msg_id);
  };
}
export const groupD = new GroupD();

const constructCardA = () => {
  const card = new Card().setSize("lg").setTheme("secondary");

  card.addTitle("A组");

  constructTeamSection(card, GROUPA);

  return card;
}

const constructCardB = () => {
  const card = new Card().setSize("lg").setTheme("secondary");

  card.addTitle("B组");

  constructTeamSection(card, GROUPB);

  return card;
}

const constructCardC = () => {
  const card = new Card().setSize("lg").setTheme("secondary");

  card.addTitle("C组");

  constructTeamSection(card, GROUPC);

  return card;
}

const constructCardD = () => {
  const card = new Card().setSize("lg").setTheme("secondary");

  card.addTitle("D组");

  constructTeamSection(card, GROUPD);

  return card;
}