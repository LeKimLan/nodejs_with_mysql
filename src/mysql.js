import mysql from 'mysql2';

export const mysqlDB = mysql.createConnection({
    host: '103.167.89.118',
    user: "lan",
    password: "admin123",
    database: "test_remote_control_mysql",
    port: 3306
  });

 