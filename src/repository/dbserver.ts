// import mysql from 'mysql';
import mysql = require('mysql');

const createConnection = () => {
  const dbServer = mysql.createConnection({
    database: 'svc-qual-db',
    user: 'root',
    password: 'pass123!',
  });

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    dbServer.connect((error) => {
      if (error) {
        console.log(`DB connection failed: ${error.message}`);
        return reject(error);
      }
      resolve(dbServer);
    });
  });
};

let connection: any;
const getConnection = async () => {
  if (!connection || !connection === false) {
    connection = await createConnection();
    console.log('getConnection is ', connection.state);
  }
  return connection;
};

const close = async (currentConnection: { state: any; end: () => any; }) => {
  console.log('Closing DB connection', currentConnection.state);
  if (currentConnection) {
    try {
      await currentConnection.end();
      console.log('DB connection closed!');
    } catch (error) {
      console.log('ERROR closing DB connection:', error.message);
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getConnection, close };
