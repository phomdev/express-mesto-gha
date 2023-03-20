const mainRouter = require('express').Router();

const { validateUserAuth, validateUserRegister } = require('../utils/data-validation');
const { registerUser, authorizeUser } = require('../controllers/users');
const authGuard = require('../middlewares/auth');
const cardRouter = require('./cards');
const userRouter = require('./users');
const NotFound = require('../utils/response-errors/NotFound');

// Регистрация и вход с валидацией
mainRouter.post('/signup', validateUserRegister, registerUser);
mainRouter.post('/signin', validateUserAuth, authorizeUser);

// С защитой авторизации
mainRouter.use('/cards', authGuard, cardRouter);
mainRouter.use('/users', authGuard, userRouter);

mainRouter.use('*', authGuard, (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
