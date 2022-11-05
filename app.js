const express = require('express');
// require('dotenv').config();
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const { celebrate, Joi } = require('celebrate');
// const { errors } = require('celebrate');

const { PORT = 3001 } = process.env;
const app = express();

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT);
}

app.use(express.json());

// app.use(cookieParser());

startServer();
