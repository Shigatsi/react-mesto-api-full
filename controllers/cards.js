const Card = require('../models/card');
const errorHandler = require('../utils/errorHandler');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      errorHandler(res, err);
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

module.exports = {
  getAllCards,
  postCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
