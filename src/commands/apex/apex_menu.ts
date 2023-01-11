import { Card, MenuCommand, BaseUser } from 'kbotify';
import { apexBest } from './apex_best';
import { apexQuery } from './apex_query';
import { apexPredator } from './apex_predator';
import { apexMap } from './apex_map';
import { apexCraft } from './apex_craft';
import { apexTopTen } from './apex_top_ten';
import { apexTopForty, apexTopFifty } from './apex_top_forty';
import { apexInvite } from './apex_invite';
import { apexTime } from './apex_time';
import { apexStreamers } from './apex_streamers';
import { apexPite } from './streamers/pite';
import { apex3mz } from './streamers/3mz';

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
            "content": "\`.apex q 橘子id\` query 查询账户状态和排位分数"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex p\` predator 查询现在达到猎杀的分数"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex time\` 查询这个赛段的时间"
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
            "content": "\`.apex top50\` 查询现在PC端大逃杀榜单前50"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex s\` [测试中] streamers 查看一些主播的直播间和账号信息"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex map\` 查询现在的地图"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.apex c\` craft 查询现在复制器可以制造的东西"
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
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "如果想要更多功能或者发现了bug~请私信狗头~狗头有小红包哦~ :wink:"
          }
        }
      ]
    }
  ]`;



export const apexMenu = new ApexMenu(apexBest, apexQuery, apexPredator, apexMap, apexCraft, apexTopTen, apexTopForty, apexInvite, apexTime, apexTopFifty, apexPite, apexStreamers, apex3mz);