const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const postUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash)=> User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(res, err);
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (name && about) {
        return res.send({ data: user });
      }
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (avatar) {
        return res.send({ data: user });
      }
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    })
    .catch((err) => {
      errorHandler(res, err);
    });
};

module.exports = {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar,
};
