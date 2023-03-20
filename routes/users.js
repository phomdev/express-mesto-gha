const userRouter = require('express').Router();

const {
  getUserList, getUserId, updateUserData, updateUserAvatar, getProfile,
} = require('../controllers/users');

// Валидация
const {
  validateUserId, validateUserUpdate, validateUserAvatar,
} = require('../utils/data-validation');

// Получить список, отдельный объект или создать
userRouter.get('/', getUserList);
// Получить данные пользователя (профиль)
userRouter.get('/me', getProfile);
userRouter.get('/:userId', validateUserId, getUserId);
// Обновить профиль или аватар
userRouter.patch('/me', validateUserUpdate, updateUserData);
userRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRouter;
