const mysql = require("mysql2");
const dbConfig = require('./index');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });
  
  // open the MySQL connection
  connection.connect(error => {
    if (error) throw error;
    else
      console.log("Successfully connected to the database.");
  });
  
  module.exports = connection;