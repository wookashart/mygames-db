/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql');
const data = require('./connectionData');

const connectData = {
  host: data.DATABASE_HOST,
  user: data.DATABASE_USER,
  password: data.DATABASE_PASSWORD,
  database: data.DATABASE_NAME,
  port: data.DATABASE_PORT
};

const connection = mysql.createConnection(connectData);
connection.connect();

module.exports = connection;
