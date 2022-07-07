import * as dbServer from '../repository/dbserver';

const selectAllUsers = async () => {
  const connection = await dbServer.getConnection();
  const queryString = `Select * from Users`;

  return new Promise((resolve, reject) => {
    connection.query(queryString, (error, result) => {
      dbServer.close(connection);
      if (error) {
        console.log(
          `there was something wrong on the query to database: ${error.message}`,
        );
        return reject(error);
      }

      resolve(result);
    });
  });
};

export default {
  selectAllUsers,
};
