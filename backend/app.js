const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { PORT = 3000, FRONTEND_ORIGIN: frontendOrigin = 'http://localhost:3000' } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/users');
const defaultErrorHandler = require('./middlewares/defaultErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUserValidation, loginUserValidation } = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const options = {
  origin: [
    frontendOrigin,
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

const app = express();
app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use(requestLogger);
app.post('/signin', loginUserValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use(errorLogger);
app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(defaultErrorHandler);
app.listen(PORT, () => { });
