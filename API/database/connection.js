/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql');

const connectData = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const connection = mysql.createConnection(connectData);
connection.connect();

module.exports = connection;
