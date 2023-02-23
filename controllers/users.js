const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/error-code');

const getUserList = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((selectedUser) => {
      if (selectedUser) {
        res.send({ data: selectedUser });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      }
    })
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректный _id запрашиваемого пользователя.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((userObject) => res.send({ data: userObject }))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((updatedData) => res.send({ data: updatedData }))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      } else if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((updatedAvatar) => res.send({ data: updatedAvatar }))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      } else if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

module.exports = {
  getUserList, getUserId, createUser, updateUserData, updateUserAvatar,
};
