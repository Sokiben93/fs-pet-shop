"use strict";

var fs = require("fs"); // Setup fs and path
var path = require("path");
var petsPath = path.join(__dirname, "pets.json");

var express = require("express"); // Setup express and app
var app = express();
var Port = process.env.PORT || 3000;
var morgan = require("morgan");

var { Pool } = require('pg');

const pool = new Pool ({
  user: 'thanhhuyle',
  host: 'localhost',
  database: 'petshop',
  port: 5432,
});

app.disable("x-powered-by");
app.use(morgan("short"));
app.use(express.json());

/* ------------------------- GET -------------------------- */
app.get('/pets', (req, res) => {
  pool.query('SELECT * FROM pets', (err, petsJSON) => {
    res.json(petsJSON.rows);
    console.log(petsJSON.rows);
  });
});

app.get('/pets/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM pets WHERE id = $1;`, [id]).then( data => {
    const pet = data.rows[0];
    if (pet) {
      res.send(pet);
    } else {
      res.sendStatus(404);
    }
  });
});

/* ------------------------ POST -------------------------- */
app.post('/pets', (req, res) => {
  const {age, name, kind} = req.body;
  pool.query(`INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3) RETURNING *;`,[age, kind, name]).then( data => {
    res.send(data.rows[0]);
  })
})

/* ------------------------ PATCH ------------------------ */
app.patch('/pets/:id', (req, res) => {
  const { id } = req.params;
  const {age, name, kind} = req.body;
  pool.query(`UPDATE pets 
  SET name = COALESCE($1, name),
      age = COALESCE($2, age),
      kind = COALESCE($3, kind)
        WHERE id = $4
        RETURNING *;`,[name, age, kind, id]).then( data => {
          if (data.rows.length === 0) {
            res.sendStatus(404);
          } else {
          res.send(data.rows[0]);
          console.log(data.rows[0])
          }
        });
});

/* ------------------------ DELETE ------------------------ */
app.delete('/pets/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM pets WHERE id = $1 RETURNING *`, [id]).then( data => {
    if (data.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

// handle all internal server errors
app.get("/boom", (req, res, next) => {
  return res.send(500, { message: "Internal Server Error" });
});

// handle all unknown HTTP requests
app.use(function (req, res) {
  res.sendStatus(404);
});

// Listening port
app.listen(Port, function () {
  console.log("Listening on port", Port);
});

// module.exports = app;