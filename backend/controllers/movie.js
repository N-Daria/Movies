const Movie = require('../models/movie');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { OtherUserInfoError } = require('../errors/OtherUserInfoError');
const { createdSuccesCode } = require('../errors/responseStatuses');
const { incorrectDataMessage, undefinedMessage, permissionDeniedMessage } = require('../errors/responseMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  }).then((movie) => res.status(createdSuccesCode).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError(incorrectDataMessage);
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new UndefinedError(undefinedMessage);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new OtherUserInfoError(permissionDeniedMessage);
      }
      movie.delete().then(() => {
        res.send({ message: 'Фильм удален', movie });
      })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError(incorrectDataMessage);
        return next(newErr);
      }

      return next(err);
    });
};
