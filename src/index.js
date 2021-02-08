const express = require('express') ;
const movies = require("./movies");
const connection = require("./config");

const app = express() ;
const port = 3000 ;

app.use(express.json());

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

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

app.post("/api/movies", (request, response) => {
  const { title, director, year, color, duration } = request.body;
  connection.query(
    "INSERT INTO movies(title, director, year, color, duration) VALUES(?, ?, ?, ?, ?)",
    [title, director, year, color, duration],
    (err, results) => {
          if (err) {
            console.log(err);
            response.status(500).send("Error saving a movie");
          } else {
            response.status(200).send("Successfully saved");
          }
        }
    );
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

app.get("/api/user", (request, response) => {
  response.status(401).send("Unauthorized");
});

app.post("/api/users", (request, reresponses) => {
  const { firstname, lastname, email } = request.body;
  connection.query(
    "INSERT INTO user(firstname, lastname, email) VALUES(?, ?, ?)",
    [firstname, lastname, email],
    (err, results) => {
      if (err) {
        console.log(err);
        response.status(500).send("Error saving a User");
      } else {
        response.status(200).send("Successfully saved");
      }
    }
  );
});