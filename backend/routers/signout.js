const { celebrate, Joi } = require('celebrate');
const signoutRouter = require('express').Router();
const { logout } = require('../controllers/auth');

signoutRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), logout);

module.exports = { signoutRouter };
