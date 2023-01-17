import { KBotify } from 'kbotify';
import auth from '../configs/auth';
import dotenv from "dotenv";
dotenv.config();

const env = process.env.ENV === "test" ? "websocket" : "webhook";

export const bot = new KBotify({
    mode: env,
    token: auth.khltoken,
    port: auth.khlport,
    verifyToken: auth.khlverify,
    key: auth.khlkey,
    ignoreDecryptError: false,
});