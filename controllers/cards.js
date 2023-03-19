const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');

const { SUCCESS_CREATED } = require('../utils/response-status');

const { NotFound } = require('../utils/response-errors/NotFound');
const { BadRequests } = require('../utils/response-errors/BadRequest');
const { Forbidden } = require('../utils/response-errors/Forbidden');

// Получение списка карточек
const getCardList = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cardList) => res.send({ data: cardList }))
    .catch((error) => next(error));
};

// Создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardObject) => res.status(SUCCESS_CREATED).send({ data: cardObject }))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      if (error instanceof ValidationError) {
        next(new BadRequests('Переданы некорректные данные при создании карточки'));
      } else { next(error); }
    });
};

// Удаление карточки
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((selectedCard) => {
      const isAuthor = req.user._id === selectedCard.owner.toString();
      if (!isAuthor) {
        next(new Forbidden('Вы не являетесь автором карточки, удаление невозможно'));
      }
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        next(new NotFound('Карточка по указанному _id не найдена'));
      }
    })
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error instanceof CastError) {
        next(new BadRequests('Переданы некорректные данные карточки'));
      } else { next(error); }
    });
};

// Like карточки
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        next(new NotFound('Карточка по указанному _id не найдена'));
      }
    })
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error instanceof CastError) {
        next(new BadRequests('Переданы некорректные данные для постановки лайка'));
      } else { next(error); }
    });
};

// Dislike карточки
const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send({ data: selectedCard });
      } else {
        next(new NotFound('Карточка по указанному _id не найдена'));
      }
    })
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error instanceof CastError) {
        next(new BadRequests('Переданы некорректные данные для снятии лайка'));
      } else { next(error); }
    });
};

module.exports = {
  getCardList, createCard, deleteCard, likeCard, removeLikeCard,
};
