import { BaseSession, Card } from 'kbotify';

// Wrap reply card method for better error logs
export const normalSendOutCardWrapper = async (session: BaseSession, card: Card, msg_id: string | undefined) => {
  if (msg_id) {
    try {
      await session.updateMessage(msg_id, [card]);
    } catch (err) {
      console.error('UPDATE CARD session msg: ', session.msg, 'session err: ', err);
    }
  } else {
    try {
      await session.replyCard(card);
    } catch (err) {
      console.error('REPLY CARD session msg: ', session.msg, 'session err: ', err);
    }
  }
}
