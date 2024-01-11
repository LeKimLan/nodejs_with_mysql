import express from "express";
const server = express();

import bodyParser from "body-parser";
server.use(bodyParser.json());

import { mysqlDB } from "./mysql.js";

mysqlDB.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + mysqlDB.threadId);
});

server.get("/", (req, res) => {
  res.send("Server OK!");
});

// server.get("/connectmysql", (req, res) => {
//   const mysqlDB = mysql.createConnection({
//     host: '103.167.89.118',
//     user: "lan",
//     password: "admin123",
//     database: "test_remote_control_mysql",
//     port: 3306
//   });

//   mysqlDB.connect((err) => {
//     if (err) {
//       res.send("error connecting: " + err.stack);
//       return;
//     }
//     res.send("connected as id " + mysqlDB.threadId);
//   });
//   return mysqlDB
// })

server.get("/users", (req, res) => {
  mysqlDB.query("select * from user", (err, result) => {
    if (err) {
      console.log("err", err);
      return;
    }
    res.status(200).json(result);
  });
});

server.get("/users/:id", (req, res) => {
  mysqlDB.query(`select * from user where id = ${req.params.id}`, (err, result) => {
    if (err) {
      console.log("err", err);
      return;
    } res.status(200).json(result);
  });
})

server.post("/add/newUser", (req, res) => {
  let newUser = req.body;
  mysqlDB.query(`insert into user (id, userName, password) value ("${req.body.id}","${req.body.userName}","${req.body.password}") `, (err, addResult) => {
    if (err) {
      console.log('err', err);
      return;
    } 
    mysqlDB.query("select * from user", (err, newDatabase) => {
      if (err) {
        console.log("err", err);
        return;
      }
      res.status(200).json(newDatabase);
    });
    res.status(200).json(newUser);
  })
})

server.get("/closemysql", (req, res) => {
  mysqlDB.end((err) => {
    if (err) {
      console.log("err", err);
      return
    }
    res.send("MySQL connection closed");
  });
})

// server.post("/user", (req, res) => {
//   mysqlDB.query("insert into user set ?", req.body, (err, result) => {})
// })

//   mysqlDB.query("select * from user", (err, res) => {
//     if (err) {
//         console.log("err",err);
//         return;
//     }
//     console.log('results', res);
//     mysqlDB.end((err) => {
//       console.log("connection end");
//     });
// })

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
  console.log("server is on");
});
