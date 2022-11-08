const moviesRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  deleteMovie,
  getMovies,
  createMovie,
} = require('../controllers/movie');
const { regExUrl, regExEn, regExRu } = require('../utils/utils');

moviesRouters.delete('/movieID', celebrate({
  params: Joi.object().keys({
    movieID: Joi.string().hex().length(24),
  }),
}), deleteMovie);

moviesRouters.get('/', getMovies);

moviesRouters.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExUrl),
    trailerLink: Joi.string().required().pattern(regExUrl),
    thumbnail: Joi.string().required().pattern(regExUrl),
    owner: Joi.string().hex().length(24),
    nameRU: Joi.string().required().pattern(regExRu),
    nameEN: Joi.string().required().pattern(regExEn),
  }),
}), createMovie);

module.exports = { moviesRouters };
