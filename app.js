const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./middlewares/cors');
const { allRouters } = require('./routers/index');

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
app.use(helmet());
app.use(limiter);

app.use(allowedCors);
app.use(requestLogger);

app.use(allRouters);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

startServer();
