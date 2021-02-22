const errorHandler = (res, err) => {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports = errorHandler;
