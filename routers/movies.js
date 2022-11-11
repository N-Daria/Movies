const moviesRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  deleteMovie,
  getMovies,
  createMovie,
} = require('../controllers/movie');
const { regExEn, regExRu } = require('../utils/utils');

moviesRouters.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required().integer().positive(),
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
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передан некорректный url');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передан некорректный url');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передан некорректный url');
    }),
    nameRU: Joi.string().required().pattern(regExRu),
    nameEN: Joi.string().required().pattern(regExEn),
    movieId: Joi.number().required().integer().positive(),
  }),
}), createMovie);

module.exports = { moviesRouters };
