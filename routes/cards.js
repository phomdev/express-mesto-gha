const cardRouter = require('express').Router();

const {
  getCardList, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

// Валидация
const {
  validateCreateCard, validateCardId,
} = require('../utils/data-validation');

// Получить список, создать или удалить карточку
cardRouter.get('/', getCardList);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
// Поставить и убрать лайк
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, removeLikeCard);

module.exports = cardRouter;
