import { KBotify } from 'kbotify';
import auth from '../configs/auth_dev';
import * as dotenv from 'dotenv';

export const bot = new KBotify({
    mode: 'websocket',
    token: auth.khltoken,
    port: auth.khlport,
    verifyToken: auth.khlverify,
    key: auth.khlkey,
    ignoreDecryptError: false,
});