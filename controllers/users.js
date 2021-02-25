const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const { NotFoundErr, UnauthorizedErr, ConflictErr, BadRequestErr } = require('../errors/index');
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

const postUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({email})
    .then((user) => {
      if (user) {
        throw new ConflictErr('Email уже используется')
      }
      return bcrypt.hash(password, 10)
    })
    .then((hash)=> User.create({
          name,
          about,
          avatar,
          email,
          password: hash
        }))
    .then(({name, about, avatar, email}) => res.send({name, about, avatar, email}))
    .catch(next)
};

const updateUserProfile = (req, res, next) => {
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

const updateUserAvatar = (req, res, next) => {
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

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user)=> {
      return res.status(200).send({message:'success'})
    })

    .catch(next)
}

module.exports = {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar, login
};
