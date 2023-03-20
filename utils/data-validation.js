const { celebrate, Joi } = require('celebrate');

// Регулярное выражение для ссылок
// https://appdevtools.com/regular-expression-tester
const regular = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// Начало валидации данных пользователя
// Валидация авторизации
const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

// Валидация регистрации
const validateUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string().min(4).max(50).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

// Валидация данных пользователя
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24)
      .required(),
  }),
});

// Валидация данных обновления пользователя
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// Валидация данных обновления аватара пользователя
const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(4).pattern(regular),
  }),
});

// Начало валидации данных карточек
// Валидация данных создания карточки
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    link: Joi.string().pattern(regular)
      .required(),
  }),
});

// Валидация карточки (обновление и прочее)
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24)
      .required(),
  }),
});

module.exports = {
  validateUserAuth,
  validateUserRegister,
  validateUserId,
  validateUserUpdate,
  validateUserAvatar,
  validateCreateCard,
  validateCardId,
};
