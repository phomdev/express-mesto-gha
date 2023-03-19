const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { Unauthorized } = require('../utils/response-errors/Unauthorized');

// Схема базы данных пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    minlength: 4,
    validate: {
      validator: (correct) => validator.isURL(correct),
      message: 'Ошибка при передаче аватара пользователя',
    },
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 50,
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Почта пользователя введена неверно',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
    select: false,
  },
});

// Then you can pull it in as needed in find and populate calls via field selection as '+password'
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((userElement) => {
      if (!userElement) { return Promise.reject(new Unauthorized('Имя пользователя или (-и) пароль введены неверно')); }
      return bcrypt.compare(password, userElement.password).then((correct) => {
        if (!correct) { return Promise.reject(new Unauthorized('Имя пользователя или (-и) пароль введены неверно')); }
        return userElement;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
