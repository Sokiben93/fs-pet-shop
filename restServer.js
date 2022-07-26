"use strict";

var fs = require("fs"); // Setup fs and path
var path = require("path");
var petsPath = path.join(__dirname, "pets.json");

var express = require("express"); // Setup express and app
var app = express();
var port = process.env.PORT || 4000;

var morgan = require("morgan");

app.disable("x-powered-by");
app.use(morgan("short"));
app.use(express.json());

// GET METHOD
app.get("/pets", function (req, res) {
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

// { "name": "Cornflake", "age": 3, "kind": "parakeet" }
// GET with /pets/:id
app.get("/pets/:id", function (req, res) {
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set("Content-Type", "application/json").send(pets[id]);
  });
});

/* ----------------- POST METHOD ----------------- */

app.post("/pets", (req, res) => {
  fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const { age, name, kind } = req.body;
    const newPet = { name, age, kind };

    if (isNaN(age) || !name || !kind) {
      res.status(400).end("Bad request");
    } else {
      pets.push(newPet);
      res.status(201).json(newPet);
    }
    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
      res.end(JSON.stringify(newPet));
    });
  });
});

/* ----------------- PATCH METHOD ----------------- */
app.patch("/pets/3", (req, res) => {
  fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const updatePet = pets[3];
    updatePet.name = req.body.name;
    res.status(201).send(updatePet);
    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
      res.end(JSON.stringify(newPet));
    });
  });
});

/* ----------------- DELETE METHOD ----------------- */
app.delete("/pets/3", (req, res) => {
    fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
  
      const pets = JSON.parse(petsJSON);
      const deletePet = pets[3];
      pets.pop(deletePet)
      res.status(200).send(deletePet);
      fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
        res.end(JSON.stringify(newPet));
      });
      
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
app.listen(port, function () {
  console.log("Listening on port", port);
});

module.exports = app;