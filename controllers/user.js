const User = require('../models/user');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const newErr = new ValidationError('Передан некорректный id');
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userID = req.user._id;

  User.findByIdAndUpdate(
    userID,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  ).onFail(() => {
    throw new UndefinedError('Запрашиваемый пользователь не найден');
  })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const newErr = new ValidationError('Переданы некорректные данные');
        return next(newErr);
      }

      return next(err);
    });
};
