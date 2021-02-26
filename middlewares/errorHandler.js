const { CelebrateError } = require('celebrate');

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CelebrateError) {
    res.status(400).send(err.details.get('body'));
  }
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
