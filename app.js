const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { authorization } = require('./middlewares/authorization');
const { userRouters } = require('./routers/user');
const { moviesRouters } = require('./routers/movies');
const { signupRouter } = require('./routers/signup');
const { signinRouter } = require('./routers/signin');
const { signoutRouter } = require('./routers/signout');

const { PORT = 3001 } = process.env;
const app = express();

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT);
}

app.use(express.json());
app.use(cookieParser());

app.use('/movies', authorization, moviesRouters);
app.use('/users', authorization, userRouters);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);

app.use(errors());

startServer();
