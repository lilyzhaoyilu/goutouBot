import { BaseSession, Card } from 'kbotify';
import { ErrorHandler } from '../../utils/error_handler';

// Wrap reply card method for better error logs
export const normalSendOutCardWrapper = async (session: BaseSession, card: Card, msg_id: string | undefined) => {
  if (msg_id) {
    try {
      await session.updateMessage(msg_id, [card]);
    } catch (err) {
      console.error('UPDATE CARD session msg: ', session.msg, 'session err: ', err);
      ErrorHandler.sendErrorMessageToLogChannel(session, `UPDATE CARD session msg: ${JSON.stringify(session.msg)} session err: ${err}`);
    }
  } else {
    try {
      await session.replyCard(card);
    } catch (err) {
      console.error('REPLY CARD session msg: ', session.msg, 'session err: ', err);
      ErrorHandler.sendErrorMessageToLogChannel(session, `UPDATE CARD no msg_id session msg: ' ${session.msg} session err: ${err}`);
    }
  }
}

export const addTailTempMessage = (card: Card) => {
  card.addModule({
    type: "context", elements: [{
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/53E0FkCSL115o15o.png"
    },
    {
      "type": "plain-text",
      "content": "想查看ALSG比赛相关信息吗？试试 .ALGS"
    },
    {
      "type": "image",
      "src": "https://img.kookapp.cn/assets/2023-01/53E0FkCSL115o15o.png"
    }]
  })
}
