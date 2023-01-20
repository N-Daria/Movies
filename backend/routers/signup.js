const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/auth');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().min(2).email()
      .messages({
        'string.email': 'Поле должно соответствовать типу email',
      }),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = { signupRouter };
