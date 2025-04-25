import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { StringTranslation } from 'utils/string_translation';
import { LEGEND_TO_IMAGE } from 'utils/assets';
import * as cheerio from 'cheerio';
import { normalSendOutCardWrapper } from './helper_methods';
import { logger } from '../../utils/logger';

class ApexPickRates extends AppCommand {
  code = 'rate'; // 只是用作标记
  trigger = 'r'; // 用于触发的文字
  help = '发送`.apex r`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {

    await pickRatesCommandWrapper('r', session);
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'pickrate');
  };
}
export const apexPickRates = new ApexPickRates();

class ApexPickRatesMaster extends AppCommand {
  code = 'ratepm'; // 只是用作标记
  trigger = 'rpm'; // 用于触发的文字
  help = '发送`.apex rpm`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {

    await pickRatesCommandWrapper('rpm', session);
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'pickrateMaster');
  };
}
export const apexPickRatesMaster = new ApexPickRatesMaster();

class ApexPickRatesDiamond extends AppCommand {
  code = 'rated'; // 只是用作标记
  trigger = 'rd'; // 用于触发的文字
  help = '发送`.apex rd`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {

    await pickRatesCommandWrapper('rd', session);
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'pickrateDiamond');
  };
}
export const apexPickRatesDiamond = new ApexPickRatesDiamond();

class ApexPickRatesPlatinum extends AppCommand {
  code = 'ratep'; // 只是用作标记
  trigger = 'rp'; // 用于触发的文字
  help = '发送`.apex rp`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {

    await pickRatesCommandWrapper('rp', session);
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'pickratePlatinum');
  };
}
export const apexPickRatesPlatinum = new ApexPickRatesPlatinum();

const pickRatesCommandWrapper = async (command: string, session: BaseSession) => {
  let rank;
  let title;
  switch (command) {
    case 'r':
      rank = '';
      title = '全部';
      break;
    case 'rpm':
      rank = 'Masterpred';
      title = '大师和猎杀';
      break;
    case 'rd':
      rank = 'Diamond';
      title = '钻石';
      break;
    case 'rp':
      rank = 'Platinum';
      title = '铂金';
      break;
    default:
      return GoutouCard.buildGenericErrorCard(session);
  }

  const msg_id = await GoutouCard.sendQueringCard(session);
  const data = await ApexLegendsStatus.getPickRate(session, rank);
  const card: Card = data instanceof Card ? data : buildPickRatesCard(data, title);
  await normalSendOutCardWrapper(session, card, msg_id);
}


const buildPickRatesCard = (data: any, rank: string = "全部") => {
  const card = GoutouCard.baseCard();
  card.addTitle(`${rank}段位英雄选择率`);

  const $ = cheerio.load(data);
  const corgi = $('.legends-banner__item')
  corgi.each((i, el) => {
    const line = $(el).find('.legends-banner__content').text();
    const parsed_info = parseString(line);
    buildPickRatesSection(card, parsed_info.legend, parsed_info.pick_rate, parsed_info.change_rate);
  })

  card.addText("查询所有段位： \`.apex r\` (**R**ates) \`。选择率\`")
  card.addText("查询猎杀和大师： \`.apex rpm\`(**R**ates **P**redator **M**aster 的缩写) \`。猎杀选择率\` \`。大师选择率\`，注意大师和猎杀是一起统计的。")
  card.addText("查询钻石： \`.apex rd\`(**R**ates **D**iamond) \`。钻石选择率\`")
  card.addText("查询铂金： \`.apex rp\`(**R**ates **P**latinum) \`。铂金选择率\` \`。白金选择率\`")

  GoutouCard.addTailMessageGoutouIfQuestion(card);
  GoutouCard.addTailALS(card, "https://apexlegendsstatus.com/game-stats/legends-pick-rates", ", 由apexlegendsstatus玩家数据生成。");
  return card;
}

const parseString = (str: String) => {
  str = str.replace("\n", "");
  const legend_matcher = str.match(/(([A-Z])([a-z])+)|(([A-Z])([a-z])+ [ ]([A-Z])([a-z])+)/)
  const legend = legend_matcher ? legend_matcher[0] : '读取错误'
  const pick_rate_matcher = str.match(/(?<=[a-z])\d+([.]\d+)?/)
  const pick_rate = pick_rate_matcher ? pick_rate_matcher[0] : "读取错误"
  const change_rate_matcher = str.match(/[▲▼]\d+([.]\d+)?/)
  const change_rate = change_rate_matcher ? change_rate_matcher[0] : "读取错误"
  return { legend, pick_rate, change_rate }
}

const buildPickRatesSection = (card: Card, legend: string, pick_rate: string, change_rate: string) => {

  const color = change_rate[0] === "▲" ? "success" : "pink";

  const image = LEGEND_TO_IMAGE.get(legend) ? LEGEND_TO_IMAGE.get(legend) : "https://img.kookapp.cn/assets/2023-01/P6NOVViwut046046.gif"

  card.addText(`**${StringTranslation.TRANSLATE_LEGEND.get(legend)}** \n选择率: ${pick_rate}% \n(font)相比上周选取率${change_rate}%(font)[${color}]`, true, "right", {
    type: "image",
    circle: true,
    src: `${image}`,
    size: "sm"
  })
}