const { celebrate, Joi } = require('celebrate');
const signoutRouter = require('express').Router();
const { logout } = require('../controllers/auth');

signoutRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }),
}), logout);

module.exports = { signoutRouter };
