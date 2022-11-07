const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(console.log)
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  }).then((movie) => res.status(201).send({ movie }))
    .catch(console.log);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .onFail(console.log)
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new Error('Недостаточно прав для удаления чужой карточки');
      }
      movie.delete().then(() => {
        res.send({ message: 'Фильм удален' });
      })
        .catch(console.log);
    })
    .catch(console.log);
};
