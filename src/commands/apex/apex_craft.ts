import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import { GoutouCard } from 'utils/goutou_card';
import { ApexLegendsStatus } from 'utils/apex_legends_status_api';
import { normalSendOutCardWrapper } from './helper_methods';

class ApexCraft extends AppCommand {
  code = 'c'; // 只是用作标记
  trigger = 'c'; // 用于触发的文字
  help = '`.apex c` 来查询现在复制器里轮换的物品'; // 帮助文字
  intro = '`.apex c` 来查询现在复制器里轮换的物品';
  func: AppFunc<BaseSession> = async (session) => {
    const msg_id = await GoutouCard.sendQueringCard(session);
    const data = await ApexLegendsStatus.getCraft(session);
    const card: Card = data instanceof Card ? data : constructCraftCard(data);

    await normalSendOutCardWrapper(session, card, msg_id);
  };
}

const constructCraftCard = (data: any): Card => {
  return new Card(
    {
      type: "card",
      theme: "secondary",
      size: "lg",
      modules: [
        {
          type: "header",
          text: {
            type: "plain-text",
            content: "复制器现有轮换"
          }
        },
        {
          type: "divider"
        },
        {
          type: "header",
          text: {
            type: "plain-text",
            content: "每日轮换"
          }
        },
        {
          type: "image-group",
          elements: [
            {
              type: "image",
              src: data[0].bundleContent[0].itemType.asset
            },
            {
              type: "image",
              src: data[0].bundleContent[1].itemType.asset
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "header",
          text: {
            type: "plain-text",
            content: "每周轮换"
          }
        },
        {
          type: "image-group",
          elements: [
            {
              type: "image",
              src: data[1].bundleContent[0].itemType.asset
            },
            {
              type: "image",
              src: data[1].bundleContent[1].itemType.asset
            }
          ]
        }
      ]
    })
}

export const apexCraft = new ApexCraft();