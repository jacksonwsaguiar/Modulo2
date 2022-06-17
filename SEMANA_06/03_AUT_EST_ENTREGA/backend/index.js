const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const hostname = "127.0.0.1";

const port = 3052;
const sqlite3 = require("sqlite3").verbose();
const app = express();

const DBPATH = "backend/database.db";
var db = new sqlite3.Database(DBPATH);

// db.run(`CREATE TABLE user (
// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
// 	name TEXT, email TEXT, photo TEXT, phone TEXT, portfolio TEXT)`);

// db.run(`INSERT INTO user (name,email,photo,phone,portfolio
// 	) VALUES (
// 	'Jackson Wellington Silva de Aguiar', 
// 	'jacksonwellington.sa@gmail.com', 
// 	'https://avatars.githubusercontent.com/u/40011417?v=4',
// 	'(84) 994463807',
// 	'https://jacksonwsa35.github.io/portifolio_jackson/')`);

app.use(express.static("../frontend/"));

app.use(express.json());

/* Definição dos endpoints */
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
