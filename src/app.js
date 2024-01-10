import express from 'express';
const server = express();

import {mysqlDB} from './mysql.js';

mysqlDB.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + mysqlDB.threadId);
  });

  mysqlDB.query("select * from user", (err, res) => {
    if (err) {
        console.log("err",err);
        return;
    } 
    console.log('results', res);
    mysqlDB.end((err) => {
      console.log('err', err)
    });
})

// connection.query("select * from test_tools_table where id = 3", (err, res) => {
//     if (err) {
//         console.log("err",err);
//         return;
//     } 
//     console.log('results', res);
// })

// connection.query("select * from test_tools_table where password = 'dmnode'", (err, res) => {
//     if (err) {
//         console.log("err",err);
//         return;
//     } 
//     console.log('results', res);
// })

// connection.query("select * from test_tools_table where password = 'dmnode' and id = 3", (err, res) => {
//     if (err) {
//         console.log("err",err);
//         return;
//     } 
//     console.log('results', res);
// })

// connection.query("insert into test_tools_table (id,userName,password) values ('5','lan_5th_test','WEWEWEWE')", (err, res) => {
//     if (err) {
//         cconsole.log("err",err);
//         return;
//     }
//     console.log('results', res);
// })



server.listen(3000, () => {
    console.log('server is on')
})