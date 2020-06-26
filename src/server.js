const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const body_parser = require("body-parser");
const { exception } = require("console");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  connectionLimit: 10,
});

const app = express();
const port = 3100;
app.use(cors());
app.use(body_parser.json());

app.post("/addNotification", (req, res) => {
  let notificationCount = req.body.notificationCount;
  let email = req.body.email;
  console.log(notificationCount + " email" + email);
  if (
    notificationCount != null &&
    notificationCount != undefined &&
    notificationCount > 0 &&
    email != null &&
    email != undefined
  ) {
    let qry =
      "update userdetails set notification_count = " +
      notificationCount +
      " where email = '" +
      email +
      "'";
    pool.query(qry, (err, result, field) => {
      if (err) {
        res.send({ body: {}, status: 400, msg: "invalid notification count" });
      }
      res.send({ body: result, status: 200 });
      res.end();
    });
  } else {
    res.send({ body: {}, status: 400, msg: "invalid notification count" });
    res.end();
  }
});

app.post("/signup", (req, res) => {
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let notificationCount = req.body.notificationCount || 0;

  console.log(req.body);

  if (
    password != null &&
    password != undefined &&
    name != null &&
    name != undefined &&
    notificationCount != null &&
    email != undefined &&
    email != null &&
    notificationCount != undefined
  ) {
    pool.query(
      "insert into userdetails (name,password,email,notification_count) values ('" +
        name +
        "','" +
        password +
        "','" +
        email +
        "'," +
        notificationCount +
        ")",
      (err, result, field) => {
        if (err) {
          console.log(err);
          res.send({ body: {}, status: 400, msg: "invalid user details" });
        }

        res.send({ body: result, status: 200 });
        res.end();
      }
    );
  } else {
    res.send({ body: {}, status: 400, msg: "invalid user details" });
    res.end();
  }
});

app.post("/login", (req, res) => {
  let password = req.body.password;
  let name = req.body.name;
  console.log(req.body);
  if (
    password != null &&
    password != undefined &&
    name != null &&
    name != undefined
  ) {
    pool.query(
      "select * from userdetails where name='" +
        name +
        "' AND password='" +
        password +
        "'",
      (err, result, field) => {
        if (err) {
          res.send({
            body: {},
            status: 400,
            msg: "invalid username or password",
          });
          return console.log(err);
        }

        if (result.length > 0) {
          res.send({ body: result, status: 200 });
          res.end();
          return console.log(result);
        } else {
          res.send({
            body: {},
            status: 400,
            msg: "invalid username or password",
          });
          res.end();
        }
      }
    );
  } else {
    res.send({ body: {}, status: 400, msg: "invalid username or password" });
  }

  // res.send({ body: "gfgh" });
  //res.sendfile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
  console.log(`server listening @ ${port}`);
});
