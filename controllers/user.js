const User = require('../models/user');
const { UndefinedError } = require('../errors/UndefinedError');
const { ValidationError } = require('../errors/ValidationError');
const { incorrectDataMessage, undefinedMessage } = require('../errors/responseMessages');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name, id: req.user._id }))
    .catch(next);
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
  )
    .orFail(() => {
      throw new UndefinedError(undefinedMessage);
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const newErr = new ValidationError(incorrectDataMessage);
        return next(newErr);
      }

      return next(err);
    });
};
