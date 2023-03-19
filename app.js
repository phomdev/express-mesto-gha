const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000, BASE_PATH = 'localhost' } = process.env;
// Защита сервера
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Для защиты от множества автоматических запросов
// https://www.npmjs.com/package/express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const authProtection = require('./middlewares/auth');
const responseHandler = require('./middlewares/response-handler');
const { validateUserAuth, validateUserRegister } = require('./utils/data-validation');
const NotFound = require('./utils/response-errors/NotFound');

// Блок кода для работы с mongoDB
const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

// Автоматически проставлять заголовки безопасности
app.use(helmet());
app.use(limiter);
app.use(express.json());

// Вход и регистрация с валидацией
app.post('/signin', validateUserAuth, login);
app.post('/signup', validateUserRegister, createUser);

// С защитой авторизации
app.use(authProtection);
app.use('/cards', cardRouter);
app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

// Обработчик ответов
app.use(errors());
app.use(responseHandler);

// Служебная информация: адрес запущенного сервера
app.listen(PORT, () => {
  console.log(`Адрес сервера — http://${BASE_PATH}:${PORT}`);
});
