const Card = require('../models/card');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/error-code');

const getCardList = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardObject) => res.send({ data: cardObject }))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((selectedCard) => {
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.' });
      }
    })
    .catch((error) => {
    // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные карточки.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.' });
      }
    })
    .catch((error) => {
    // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

const removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.' });
      }
    })
    .catch((error) => {
    // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятии лайка.' });
      } else {
        res.status(ERROR_SERVER).send(`На сервере произошла ошибка: ${error}`);
      }
    });
};

module.exports = {
  getCardList, createCard, deleteCard, likeCard, removeLikeCard,
};
