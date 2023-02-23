const cardRouter = require('express').Router();

const {
  getCardList, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

// Получить список, создать или удалить
cardRouter.get('/', getCardList);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
// Поставить и убрать лайк
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', removeLikeCard);

module.exports = cardRouter;
