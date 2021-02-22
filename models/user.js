const mongoose = require('mongoose');
const validator =  require ('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/.test(v);
      },
      message: 'Введите правильный url',
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email)=>validator.isEmail(email),
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

module.exports = mongoose.model('user', userSchema);
