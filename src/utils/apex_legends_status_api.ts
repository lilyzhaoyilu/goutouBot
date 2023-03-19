import auth from 'configs/auth';
import { BaseSession, Card } from "kbotify";
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

  static async getCraft(session: BaseSession): Promise<Card | any> {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/crafting?auth=${auth.APEXSTATUS}`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `get craft: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getQuery(session: BaseSession, queryUser: string) {

    // block illegal origin id query
    const origin_id_matcher = new RegExp('([A-z0-9-_])+');
    if (!origin_id_matcher.test(queryUser)) {
      return GoutouCard.buildNoCNOriginIdCard(session);
    }

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
        return (GoutouCard.buildNoCNOriginIdCard(session));
      }
      switch (err.response?.status) {
        // did not find data
        case 404:
          ErrorHandler.sendErrorMessageToLogChannel(session, `query notfound 404: ${queryUser}`)
          return (GoutouCard.buildQueryNotFoundCard(session));
        // over rate limit
        case 429:
          ErrorHandler.sendErrorMessageToLogChannel(session, `overlimit q: ${queryUser}`)
          return (GoutouCard.buildOverLimitCard(session));
        default:
          ErrorHandler.sendErrorMessageToLogChannel(session, `generic error querying ${queryUser}`)
          return (GoutouCard.buildGenericErrorCard(session));
      }
    }
  }

  static async getLeaderBoard(session: BaseSession) {
    try {
      const res = await axios.get(`https://api.mozambiquehe.re/leaderboard?auth=${auth.APEXSTATUS}&legend=Any&platform=PC&key=rankScore`);
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `leaderboard: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getLiveLeaderboard(session: BaseSession) {
    try {
      const res = await axios.get(`https://apexlegendsstatus.com/live-ranked-leaderboards/Battle_Royale/PC`);
      return res;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `leaderboard: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  // TODO: make rank an enum/ interface
  static async getPickRate(session: BaseSession, rank: string = '') {
    try {
      const res = await axios.get(`https://apexlegendsstatus.com/game-stats/legends-pick-rates${rank ? '/' + rank : ''}`)
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `Pick rate: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getBrDistribution(session: BaseSession) {
    // TODO: make url dynamic, its card coded season now
    try {
      const res = await axios.get("https://apexlegendsstatus.com/lib/php/rankdistrib.php?unranked=yes")
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `get BR distribution: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }

  static async getSeasonTimeInfo(session: BaseSession) {
    try {
      const res = await axios.get("https://api.jumpmaster.xyz/seasons/Current")
      return res.data;
    } catch (err) {
      ErrorHandler.sendErrorMessageToLogChannel(session, `get SeasonTimeInfo: ${err}`);
      return GoutouCard.buildGenericErrorCard(session);
    }
  }
}