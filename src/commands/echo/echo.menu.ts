import { Card, MenuCommand } from 'kbotify';

class EchoMenu extends MenuCommand {
    code = 'echo';
    trigger = 'echo';
    help = '如需测试KMarkDown请发送".echo kmd"';
    intro = '复读菜单';
    menu = new Card().addText('狗头已经上线啦!').toString();
    useTempMenu = false;
    useCardMenu = true; // 使用卡片菜单
}

export const echoMenu = new EchoMenu();
