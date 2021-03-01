const { CelebrateError } = require('celebrate');

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CelebrateError) {
    res.status(400).send(err.details.get('body'));
  }
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  }
  if (['CastError', 'ValidationError'].includes(err.name)) {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }

  res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
