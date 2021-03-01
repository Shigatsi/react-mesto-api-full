const Card = require('../models/card');
const { NotFoundErr, ForbidenErr } =require('../errors/index');
const errorHandler = require('../utils/errorHandler');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const postCard = (req, res, next) => {
  console.log('req.user', req.user);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next)
};

const deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if(!card) {
        throw new NotFoundErr(`Карточка с id${req.params.id} не найдена`)
      }
       if (card.owner.toString() !== req.user._id) {
         throw new ForbidenErr('Удалить карточку может только автор карточки')
       }
      return res.send({ data: card });
    })
  .catch(next)

};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      // return res.status(404).send({ message: 'Карточка не найдена' });
      throw new NotFoundErr('Карточка не найдена');
    })
    .catch(next);
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
    .catch(next)
};

module.exports = {
  getAllCards,
  postCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};


// errorHandler и return res.status() в контроллере cards быть не должно согласно условию задания о централизованной обработке ошибок
