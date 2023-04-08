import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { StringTranslation } from 'utils/string_translation';
import { normalSendOutCardWrapper } from './helper_methods';

class ApexMap extends AppCommand {
  code = 'map'; // 只是用作标记
  trigger = 'map'; // 用于触发的文字
  help = '发送`.apex map`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getMapRotation(session);
    const card: Card = data instanceof Card ? data : buildMapCard(data);
    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

const expandTime = (time: number): number => {
  return time * 1000;
}

const buildMapCard = (data: any) => {
  return new Card({
    type: "card",
    theme: "secondary",
    size: "lg",
    modules: [
      {
        type: "section",
        text: {
          type: "kmarkdown",
          content: ":world_map: (font)大逃杀(font)[success]"
        }
      },
      {
        type: "section",
        text: {
          type: "kmarkdown",
          content: `**排位** [${StringTranslation.translateMap(data.ranked.current.map)}](${data.ranked.current.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] [${StringTranslation.translateMap(data.ranked.next.map)}](${data.ranked.next.asset})`
        }
      },
      {
        type: "countdown",
        mode: "day",
        endTime: expandTime(data.ranked.current.end)
      },
      {
        type: "section",
        text: {
          type: "kmarkdown",
          content: `**匹配** [${StringTranslation.translateMap(data.battle_royale.current.map)}](${data.battle_royale.current.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] [${StringTranslation.translateMap(data.battle_royale.next.map)}](${data.battle_royale.next.asset})`
        }
      },
      {
        type: "countdown",
        mode: "day",
        endTime: expandTime(data.battle_royale.current.end)
      },
      {
        type: "section",
        text: {
          type: "kmarkdown",
          content: ":world_map: (font)混合模式(font)[success]"
        }
      },
      {
        type: "section",
        text: {
          type: "kmarkdown",
          content: `**${StringTranslation.translateMixtapMode(data.ltm?.current?.eventName)}** [${StringTranslation.translateMap(data.ltm?.current?.map)}](${data.ltm?.current?.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] **${StringTranslation.translateMixtapMode(data.ltm?.next?.eventName)}** [${StringTranslation.translateMap(data.ltm?.next?.map)}](${data.ltm?.next?.asset})`
        }
      },
      {
        type: "countdown",
        mode: "day",
        endTime: expandTime(data.ltm.current.end)
      }
    ]
  });
}

export const apexMap = new ApexMap();