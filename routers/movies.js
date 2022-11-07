const userRouters = require('express').Router();
const {
  deleteMovie,
  getMovies,
  createMovie,
} = require('../controllers/movie');

userRouters.delete('/movieID', deleteMovie);
userRouters.get('/', getMovies);
userRouters.post('/', createMovie);
