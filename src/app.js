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
  mysqlDB.query(
    `select * from user where id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log("err", err);
        return;
      }
      res.status(200).json(result);
    }
  );
});

server.post("/add/newUser", (req, res) => {
  let newUser = req.body;
  mysqlDB.query(
    `insert into user (id, userName, password) value ("${req.body.id}","${req.body.userName}","${req.body.password}") `,
    (err, addResult) => {
      if (err) {
        console.log("err", err);
        return;
      }
      res.status(200).json(newUser);
    }
  );
});

server.delete("/delete/userID/:id", (req, res) => {
  mysqlDB.query(
    `delete from user where id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log("err", err);
        return;
      }
      if (result.affectedRows == 1) {
        res.send(`User with ID ${req.params.id} has been deleted.`);
      } else {
        res.status(404).send('User not found.');
      }
      mysqlDB.query("select * from user", (err, newTable) => {
        if (err) {
          console.log("err", err);
          return;
        }
        res.status(200).json(newTable);
      });
    }
  );
});

// server.get("/", () => {});

server.get("/closemysql", (req, res) => {
  mysqlDB.end((err) => {
    if (err) {
      console.log("err", err);
      return;
    }
    res.send("MySQL connection closed");
  });
});

server.listen(3000, () => {
  console.log("server is on");
});
