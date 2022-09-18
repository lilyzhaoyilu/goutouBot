import { Card, MenuCommand } from 'kbotify';
import { messagerSend } from './messager_send';

class MessagerMenu extends MenuCommand {
  code = 'msg';
  trigger = 'msg';
  help = '内部测试用';
  intro = '测试用';
  menu = new Card().addText('msg for internal usage only!').toString();
  useCardMenu = true; // 使用卡片菜单
}

export const messagerMenu = new MessagerMenu(messagerSend);