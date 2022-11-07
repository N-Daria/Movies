const userRouters = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/user');

userRouters.get('/me', getUserInfo);

userRouters.patch('/me', updateUserInfo);

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
