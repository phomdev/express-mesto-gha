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

const { validateUserAuth, validateUserRegister } = require('./utils/data-validation');
const { registerUser, authorizeUser } = require('./controllers/users');
const authGuard = require('./middlewares/auth');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const NotFound = require('./utils/response-errors/NotFound');
const responseHandler = require('./middlewares/response-handler');

// Блок кода для работы с mongoDB
const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

// Автоматически проставлять заголовки безопасности
app.use(express.json());
app.use(limiter);
app.use(helmet());

// Регистрация и вход с валидацией
app.post('/signup', validateUserRegister, registerUser);
app.post('/signin', validateUserAuth, authorizeUser);

// С защитой авторизации
app.use('/cards', authGuard, cardRouter);
app.use('/users', authGuard, userRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

// Обработчик ответов
app.use(errors());
app.use(responseHandler);

// Служебная информация: адрес запущенного сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Адрес сервера — http://${BASE_PATH}:${PORT}`);
});
