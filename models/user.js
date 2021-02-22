const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('user', userSchema);
