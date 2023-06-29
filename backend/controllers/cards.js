const Card = require('../models/card');

const STATUS_OK = 200;
const STATUS_OK_CREATE = 201;

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

// получить карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(STATUS_OK).send(cards);
    })
    .catch(next);
};

// создать карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => {
      res.status(STATUS_OK_CREATE).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('переданы некорректные данные!'));
      }
      return next();
    });
};

// удалить карточку по id
const deleteCardById = (req, res, next) => {
  const id = req.user._id;
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (card.owner.toString() !== id) {
        throw new ForbiddenError('Нет прав для удаления карточки.');
      } else {
        return Card.findByIdAndDelete(req.params.id)
          .then((deletedCard) => {
            res.status(STATUS_OK).send(deletedCard);
          });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null || card === undefined) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('переданы некорректные данные!'));
      }
      return next();
    });
};

// удалить лайк с карточки
const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null || card === undefined) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.status(STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('переданы некорректные данные!'));
      }
      return next();
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  deleteCardLike,
};
