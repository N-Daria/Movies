const userRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/user');

userRouters.get('/me', getUserInfo);

userRouters.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле должно соответствовать типу email',
      }),
  }),
}), updateUserInfo);

module.exports = { userRouters };
