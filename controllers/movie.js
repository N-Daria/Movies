const Movie = require('../models/movie');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { OtherUserInfoError } = require('../errors/OtherUserInfoError');
const { createdSuccesCode } = require('../errors/responseStatuses');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new UndefinedError('Запрашиваемая карточка не найдена');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new OtherUserInfoError('Недостаточно прав для удаления чужой карточки');
      }
      movie.delete().then(() => {
        res.send({ message: 'Фильм удален' });
      })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};
