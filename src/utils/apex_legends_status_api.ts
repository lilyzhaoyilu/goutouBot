import auth from 'configs/auth';
import { BaseSession } from "kbotify";
import { ErrorHandler } from "./error_handler";
import { GoutouCard } from './goutou_card';

const axios = require('axios');

export class ApexLegendsStatus {

  // All the class members returns queries
  // If the query was suc, then the data was returned
  // Otherwise, an error card was returned

  static async getMapRotation(session: BaseSession) {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/maprotation?auth=${auth.APEXSTATUS}&version=2`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `map rotation: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getReachPredatorOnPC(session: BaseSession) {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/predator?auth=${auth.APEXSTATUS}`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `reach predator on PC: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getCraft(session: BaseSession) {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/crafting?auth=${auth.APEXSTATUS}`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `get craft: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getQuery(session: BaseSession, queryUser: string, msg_id: string = '') {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/bridge?auth=${auth.APEXSTATUS}&player=${queryUser}&platform=PC&enableClubsBeta=true&merge=true&removeMerged=true`)
      if (res.data.Error) {
        ErrorHandler.sendErrorMessageToLogChannel(session, `notfound when querying: ${queryUser}`)
        return GoutouCard.buildQueryNotFoundCard(session);
      }
      return res.data;
    } catch (err: any) {
      if (!axios.isAxiosError(err) && err?.code == 'ERR_UNESCAPED_CHARACTERS') {
        ErrorHandler.sendErrorMessageToLogChannel(session, `queried chinese: ${queryUser}`);
        await session.replyCard(GoutouCard.buildNoCNOriginIdCard(session));
      }
      switch (err.response?.status) {
        // did not find data
        case 404:
          ErrorHandler.sendErrorMessageToLogChannel(session, `query notfound 404: ${queryUser}`)
          await session.replyCard(GoutouCard.buildQueryNotFoundCard(session));
          break;
        // over rate limit
        case 429:
          ErrorHandler.sendErrorMessageToLogChannel(session, `overlimit q: ${queryUser}`)
          await session.replyCard(GoutouCard.buildOverLimitCard(session));
          break;
        default:
          ErrorHandler.sendErrorMessageToLogChannel(session, `generic error querying ${queryUser}`)
          await session.replyCard(GoutouCard.buildGenericErrorCard(session));
      }
    }
  }

  static async getLeaderBoard(session: BaseSession) {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/leaderboard?auth=${auth.APEXSTATUS}&legend=Any&platform=PC&key=rankScore`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `leaderboard: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }
}