const userRouter = require('express').Router();

const {
  getUserList, getUserId, createUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

// Получить список, отдельный объект или создать
userRouter.get('/', getUserList);
userRouter.get('/:userId', getUserId);
userRouter.post('/', createUser);
// Обновить профиль или аватар
userRouter.patch('/me', updateUserData);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
