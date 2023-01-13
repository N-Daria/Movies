const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { ValidationError } = require('../errors/ValidationError');
const { AlreadyExsistsError } = require('../errors/AlreadyExsistsError');
const { incorrectDataMessage, alreadyExsistsMessage } = require('../errors/responseMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ _id: user._id, name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };
      res.status(201).send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const newErr = new ValidationError(incorrectDataMessage);
        return next(newErr);
      }
      if (err.code === 11000) {
        const newErr = new AlreadyExsistsError(alreadyExsistsMessage);
        return next(newErr);
      }

      return next(err);
    });
};

module.exports.logout = (req, res, next) => {
  if (req.cookies.token) {
    return res.clearCookie('token').send({ message: 'Токен удален' });
  }

  return next();
};
