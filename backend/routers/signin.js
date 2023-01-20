const { celebrate, Joi } = require('celebrate');
const signinRouter = require('express').Router();
const { login } = require('../controllers/auth');

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email()
      .messages({
        'string.email': 'Поле должно соответствовать типу email',
      }),
    password: Joi.string().required().min(2),
  }),
}), login);

module.exports = { signinRouter };
