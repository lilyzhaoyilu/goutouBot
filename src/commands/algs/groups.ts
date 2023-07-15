import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { normalSendOutCardWrapper } from '../apex/helper_methods';
import { GROUPA, GROUPB, GROUPC, GROUPD, Team, WINNERS, LOSERS } from 'utils/team_assets';
import { constructTeamSection } from './menu';

class GroupA extends AppCommand {
  code = 'a'; // 只是用作标记
  trigger = 'a'; // 用于触发的文字
  help = '发送`.algs a`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCard("A组", GROUPA), msg_id);
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
    await normalSendOutCardWrapper(session, constructCard("B组", GROUPB), msg_id);
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
    await normalSendOutCardWrapper(session, constructCard("C组", GROUPC), msg_id);
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
    await normalSendOutCardWrapper(session, constructCard("D组", GROUPD), msg_id);
  };
}
export const groupD = new GroupD();

class GroupWinners extends AppCommand {
  code = 'winners'; // 只是用作标记
  trigger = 'winners'; // 用于触发的文字
  help = '发送`.algs winners`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCard("胜者组", WINNERS), msg_id);
  };
}
export const groupWinners = new GroupWinners();

class GroupLosers extends AppCommand {
  code = 'losers'; // 只是用作标记
  trigger = 'losers'; // 用于触发的文字
  help = '发送`.algs losers`就可以啦~'; // 帮助文字
  intro = '有问题私信狗头';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    await normalSendOutCardWrapper(session, constructCard("败者组", LOSERS), msg_id);
  };
}
export const groupLosers = new GroupLosers();

const constructCard = (title: string, data: Team[]) => {
  const card = new Card().setSize("lg").setTheme("secondary");
  card.addTitle(title);
  constructTeamSection(card, data);
  return card;
}