const express = require('express') ;
const movies = require("./movies");

const app = express() ;
const port = 3000 ;

app.listen(port, () => {

  console.log(`Server is running on ${port}`);

});

app.get("/", (request, response) => {

  response.send("Welcome to my favorite movie list");

});

app.get("/api/movies", (request, response) => {

  response.status(200).json(movies);

});

app.get("/api/movies/:id", (request, response) => {
  const movie = movies.find(movie => movie.id === parseInt(request.params.id));

  if (!movie) response.status(404).send('Not Found ...');

  response.status(200).json(movie);
});

app.get("/api/search", (request, response) => {
  const movie = movies.filter(movie => movie.duration <= parseInt(request.query.maxDuration));

  if (movie !== 0) response.status(404).send('No movies found for this');

  response.status(200).json(movie);
});

app.get("/api/users", (request, response) => {

  response.status(401).send('unauthorized');

});