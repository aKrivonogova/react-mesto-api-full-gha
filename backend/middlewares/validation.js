// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const regExpUrl = /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/;
/*  ------------------------Пользователь----------------------------------  */

//  Валидация регистрации пользователя
const createUserValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
    avatar: Joi.string().pattern(regExpUrl),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

//  Валидация авторизации пользователя
const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидация для запроса на конкретного юзера
const getUserValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});
//  Валидация для обновления аватара
const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExpUrl),
  }),
});

// Валидация для обновления информации о юзере
const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

/*  ------------------------Карточки----------------------------------  */

// Валидация создания карточки
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(regExpUrl),
  }),
});

// Валидация для действий с id каточки
const cardIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserAvatarValidation,
  updateUserInfoValidation,
  createCardValidation,
  cardIdValidation,
};
