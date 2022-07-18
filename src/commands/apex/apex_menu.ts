import { Card, MenuCommand, BaseUser } from 'kbotify';
import { apexBest } from './apex_best';
import { apexQuery } from './apex_query';
import { apexPredator } from './apex_predator';
import { apexMap } from './apex_map';
import { apexCraft } from './apex_craft';
import { apexTopTen } from './apex_top_ten';
import { apexInvite } from './apex_invite';

class ApexMenu extends MenuCommand {
  code = 'apex';
  trigger = 'apex';
  help = '这是apex指令的菜单';
  intro = '输入.apex 查看指令帮助';
  menu = apexMenuCard;
  useCardMenu = true; // 使用卡片菜单
};

const apexMenuCard = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "Apex 指令菜单"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex q 橘子id\` 查询账户状态和排位分数"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex p\` 查询现在达到猎杀的分数"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex top10\` 查询现在PC端大逃杀榜单前10"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex map\` 查询现在大逃杀的地图"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex c\` 查询现在复制器可以制造的东西"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex best\` 获取狗头的夸夸"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.在吗\` 查看狗头是否在线"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex invite\` 邀请狗头去自己服务器"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "获取每个指令的帮助"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "在每个指令后面加上\` 帮助\`就可以啦~:smile:\n比如\`.apex p 帮助\`"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain-text",
              "content": "想要更多功能？请联系开发者哦。:wink:"
            }
          ]
        }
      ]
    }
  ]`;



export const apexMenu = new ApexMenu(apexBest, apexQuery, apexPredator, apexMap, apexCraft, apexTopTen, apexInvite);