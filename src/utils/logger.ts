import sqlite3 from 'sqlite3';
import auth from '../configs/auth';

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  server_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  identify_num TEXT NOT NULL,
  request_message TEXT NOT NULL,
  status TEXT NOT NULL,
  instance TEXT NOT NULL
)`;


export const logger = (
  serverId: string | undefined,
  userId: string,
  username: string,
  identifyNum: string,
  requestMessage: string,
  instance = auth.INSTANCE_NUMBER
) => {
  const db = new sqlite3.Database('log.db', (err) => {
    if (err) {
      console.error('Failed to open database:', err.message);
      return;
    }

    db.serialize(() => {
      db.run(CREATE_TABLE, (err) => {
        if (err) {
          console.error('Failed to create table:', err.message);
          return;
        }

        const sql = `
          INSERT INTO log (server_id, user_id, username, identify_num, request_message,status, instance)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // undefined means its DM, record as 0.
        const server_id = serverId === undefined ? 0 : serverId

        db.run(
          sql,
          [server_id, userId, username, identifyNum, requestMessage, "unknown", instance],
          (err) => {
            if (err) {
              console.error('Failed to insert log:', err.message);
            }

            db.close((err) => {
              if (err) {
                console.error('Failed to close database:', err.message);
              }
            });
          }
        );
      });
    });
  });
};