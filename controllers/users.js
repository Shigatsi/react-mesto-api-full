const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const { NotFoundErr } = require('../errors/index');
const errorHandler = require('../utils/errorHandler');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundErr('Пользователь не найден');
    })
    .catch(next);
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

const login = (req,res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar, login
};
