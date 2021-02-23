const express = require("express");
const mysql = require("mysql");
const app = express();

const config = {
  host: "node_db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);
const sql = `CREATE TABLE IF NOT EXISTS people (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NULL,
  PRIMARY KEY (id));
`;

connection.query(sql);

const sqlname = `INSERT INTO people(nome) values('Daniel')`;
connection.query(sqlname);

// connection.connect();

let list = "";

connection.query("SELECT * from people", function (error, results, fields) {
  if (error) throw error;

  results.map((u) => {
    list += u.nome + "<br />";
  });
});

connection.end();

//

app.get("/", (req, res) => {
  res.send("<h1>Full Cycle Rocks!</h1>" + list);
});

app.listen(3000, () => {
  console.log("Rondando na porta 3000");
});
