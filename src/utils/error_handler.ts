import { BaseSession } from 'kbotify';
import { bot } from 'init/client';
import auth from 'configs/auth';

export class ErrorHandler {

  static getSessionInfoForMessaging(session: BaseSession) {
    // let res = `${session.guild.username}#${}`
  }

  static async sendErrorMessageToLogChannel(session: BaseSession, message: string) {
    bot.API.message.create(9, auth.LOG_CHANNEL as string, `${session.user.username}#${session.user.identifyNum}: ${message}. \n user_id:${session.userId}`)
  }

  static async sendChatMessageToChatChannel(e: any) {
    bot.API.message.create(9, auth.DIRECT_MESSAGE_CHANNEL as string, `${e.extra.author.username}#${e.extra.author.identify_num}: ${e.content} \n author_id: ${e.author_id} `)
  }

  static async forwardAtMessageToChatChannel(e: any) {
    bot.API.message.create(9, auth.DIRECT_MESSAGE_CHANNEL as string, `${e.extra.author.username}#${e.extra.author.identify_num}: ${e.content} \n author_id: ${e.author_id}\n target_id: ${e.target_id}`)
  }
}