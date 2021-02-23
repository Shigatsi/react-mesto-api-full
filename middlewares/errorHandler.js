// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.status) {
    res.status(err.status).send({message: err.message})
  }

  res.status(500).send({message: err.message})
}

module.exports = errorHandler;
