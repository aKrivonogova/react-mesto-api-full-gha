// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const DefaultError = require('../errors/DefaultError');
const DuplicateError = require('../errors/DuplicateError');
const AuthError = require('../errors/AuthError');

const SOULT = 10;
const STATUS_OK = 200;
const STATUS_OK_CREATE = 201;

// Запросить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send((users));
    })
    .catch(next);
};

// Запросить конкретного пользователя
const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорретный Id'));
        return;
      }
      next(new DefaultError('на сервере произошла ошибка'));
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорретные данные'));
        return;
      }
      next(new DefaultError('на сервере произошла ошибка'));
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорретные данные'));
        return;
      }
      next(new DefaultError('на сервере произошла ошибка'));
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SOULT).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    }).then((user) => {
      res.status(STATUS_OK_CREATE).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
      .catch((err) => {
        if (err.name === 'MongoServerError') {
          return next(new DuplicateError('Пользователь с таким email уже существует'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Некорректные данные'));
        }
        return next(new DefaultError('на сервере произошла ошибка'));
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      next(new AuthError('Неверный логин или пароль.'));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      } else next(new DefaultError('на сервере произошла ошибка'));
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
