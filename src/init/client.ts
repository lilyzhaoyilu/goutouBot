import { KBotify } from 'kbotify';
import auth from '../configs/auth_dev';

// export const bot = new KBotify({
//     mode: 'websocket',
//     token: auth.khltoken,
//     port: auth.khlport,
//     verifyToken: auth.khlverify,
//     key: auth.khlkey,
//     ignoreDecryptError: false,
// });

export const bot = new KBotify({
    mode: 'webhook',
    token: auth.khltoken,
    port: auth.khlport,
    verifyToken: auth.khlverify,
    key: auth.khlkey,
    ignoreDecryptError: false,
});