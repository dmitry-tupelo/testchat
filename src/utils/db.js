import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

const tableName = 'messages';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'chattest2.db', location: 'default'});
};

export const createTable = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        title TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getChatItems = async db => {
  try {
    let messages = [];
    const results = await db.executeSql(
      `SELECT rowid as id,title FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index));
      }
    });
    return messages;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get messages !!!');
  }
};

export const saveChatMessages = async (db, messages) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, title) values` +
    messages.map(i => `(${i.id}, '${i.title}')`).join(',');

  return db.executeSql(insertQuery);
};
