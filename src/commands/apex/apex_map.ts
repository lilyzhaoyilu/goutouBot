import { AppCommand, AppFunc, BaseSession, Card, ModuleObject } from 'kbotify';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { GoutouCard } from 'utils/goutou_card';
import { StringTranslation } from 'utils/string_translation';
import { normalSendOutCardWrapper } from './helper_methods';
import { MAP_TO_FINAL_CIRCLES } from 'utils/assets';
import { logger } from '../../utils/logger';

class ApexMap extends AppCommand {
  code = 'map'; // 只是用作标记
  trigger = 'map'; // 用于触发的文字
  help = '发送`.apex map`就可以啦~'; // 帮助文字
  intro = '什么时候会有intro';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getMapRotation(session);
    const card: Card = data instanceof Card ? data : constructMapCard(data);
    await normalSendOutCardWrapper(session, card, msg_id);
    logger(session.guild?.id, session.userId, session.user?.username, session.user?.identifyNum, 'map');
  };
}

const expandTime = (time: number): number => {
  return time * 1000;
}

const constructMapCard = (data: any) => {
  const card = GoutouCard.baseCard();
  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": ":world_map: (font)大逃杀(font)[success]"
    }
  });

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**排位** [${StringTranslation.translateMap(data.ranked.current.map)}](${data.ranked.current.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] [${StringTranslation.translateMap(data.ranked.next.map)}](${data.ranked.next.asset})`
    }
  });

  card.addModule({
    "type": "countdown",
    "mode": "day",
    endTime: expandTime(data.ranked.current.end)
  });

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**匹配** [${StringTranslation.translateMap(data.battle_royale.current.map)}](${data.battle_royale.current.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] [${StringTranslation.translateMap(data.battle_royale.next.map)}](${data.battle_royale.next.asset})`
    }
  });

  card.addModule({
    "type": "countdown",
    "mode": "day",
    endTime: expandTime(data.battle_royale.current.end)
  });

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": ":world_map: (font)混合模式(font)[success]"
    }
  });

  card.addModule({
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": `**${StringTranslation.translateMixtapMode(data.ltm?.current?.eventName)}** [${StringTranslation.translateMap(data.ltm?.current?.map)}](${data.ltm?.current?.asset}) (emj)arrow(emj)[1613997086764422/v0f2vkdaJ303h03h] **${StringTranslation.translateMixtapMode(data.ltm?.next?.eventName)}** [${StringTranslation.translateMap(data.ltm?.next?.map)}](${data.ltm?.next?.asset})`
    }
  });

  card.addModule({
    "type": "countdown",
    "mode": "day",
    endTime: expandTime(data.ltm.current.end)
  });
  // bulb

  const cur_map_final_circle = MAP_TO_FINAL_CIRCLES.get(data.ranked.current.map);

  if (cur_map_final_circle) {
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": ":bulb: (font)地图决赛圈点位(font)[warning]"
      }
    });
    card.addImage(cur_map_final_circle);

    // Special logic to handle Storm Point graph note
    if (data.ranked.current.map === 'Storm Point') {
      card.addModule({
        "type": "section",
        "text": {
          "type": "kmarkdown",
          "content": `紫色代表概率高。颜色优先级是 黄 > 绿 > 青 > 品红 > 橙 > 深蓝 > 淡粉 > 淡黄 > 黄`
        }
      });
    }

    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `感谢[大老师](https://kook.top/AhJPdm) 提供`
      }
    });
    card.addModule({
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": `Apex 知识库哪里找？[大老师频道](https://kook.top/AhJPdm) 全都有`
      }
    });
  }
  return card;
}

export const apexMap = new ApexMap();