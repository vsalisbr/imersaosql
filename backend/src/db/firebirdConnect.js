import firebird from 'node-firebird';

const dbOptions = () => {
  return {
    host: 'database',
    port: 3050,
    database: '/firebird/data/imersaosql.fdb',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false,
    role: null,
    pageSize: 8192,
  };
};

function attachDb(options) {
  return new Promise((resolve, reject) => {
    firebird.attach(options, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

function createTransaction(db) {
  return new Promise((resolve, reject) => {
    db.transaction((err, transaction) => {
      if (err) {
        reject(err);
      } else {
        resolve(transaction);
      }
    });
  });
}

function getQuery(transaction, query, params) {
  return new Promise((resolve, reject) => {
    transaction.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function commitTransaction(transaction) {
  return new Promise((resolve, reject) => {
    transaction.commit((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function detachDb(db) {
  db.detach();
}

export async function dbQuery(query, params) {
  try {
    const options = dbOptions();
    const db = await attachDb(options);
    const transaction = await createTransaction(db);
    const result = await getQuery(transaction, query, params);
    await commitTransaction(transaction);
    await detachDb(db);
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
