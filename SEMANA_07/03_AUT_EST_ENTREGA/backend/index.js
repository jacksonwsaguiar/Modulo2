const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const hostname = "127.0.0.1";

const port = 3052;
const sqlite3 = require("sqlite3").verbose();
const app = express();

const DBPATH = "database.db";
var db = new sqlite3.Database(DBPATH);

// db.run(`CREATE TABLE recomendation (
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	description TEXT)`);

// db.run(`INSERT INTO user (name,email,photo,phone,portfolio
// 	) VALUES (
// 	'Jackson Wellington Silva de Aguiar',
// 	'jacksonwellington.sa@gmail.com',
// 	'https://avatars.githubusercontent.com/u/40011417?v=4',
// 	'(84) 994463807',
// 	'https://jacksonwsa35.github.io/portifolio_jackson/')`);

app.use(express.static("../frontend/"));

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
/* Definição dos endpoints */
app.post("/recomendation", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { description } = req.body;
  var db = new sqlite3.Database(DBPATH);
  var sql = "INSERT INTO recomendation (description) VALUES (?)";
  db.run(sql, [description], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ message: "dado adicionado com sucesso" });
  });
  db.close();
});

app.get("/recomendation", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database(DBPATH);
  var sql = "SELECT * FROM recomendation";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close();
});

app.delete("/recomendation/:id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database(DBPATH);
  var sql = "DELETE FROM recomendation where id=?";
  db.get(sql, [req.params.id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close();
});

app.put("/recomendation", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { description, id } = req.body;
  var db = new sqlite3.Database(DBPATH);
  var sql = "UPDATE recomendation SET description=? WHERE id=?";
  db.run(sql, [description, id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({"message":"recomendation changed"});
  });
  db.close();
});
// app.get("/user", (req, res) => {}

app.get("/user", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database(DBPATH);
  var sql = "SELECT * FROM user where id=1";
  db.get(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close();
});

/* Inicia o servidor */
app.listen(port, hostname, () => {
  console.log(`BD server running at http://${hostname}:${port}/`);
});
