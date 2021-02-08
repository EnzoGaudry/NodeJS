const express = require('express') ;
const movies = require("./movies");
const connection = require("./config");

const app = express() ;
const port = 3000 ;

app.listen(port, () => {

  console.log(`Server is running on ${port}`);

});

app.get("/", (request, response) => {

  response.send("Welcome to my favorite movie list");

});

app.get("/api/movies", (request, response) => {

  connection.query("SELECT * from movies", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving data");
    } else {
      response.status(200).json(results);
    }
  });

});

app.get("/api/movies/:id", (request, response) => {
  connection.query("SELECT * from movies WHERE id=?", [request.params.id], (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving data");
    } else {
      response.status(200).json(results);
    }
  });
});

app.get("/api/search", (request, response) => {
  connection.query("SELECT * from movies where duration <= ?", [request.query.maxDuration], (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    } else {
      response.status(200).json(results);
    }
  })
});

app.get("/api/users", (request, response) => {

  response.status(401).send('unauthorized');

});