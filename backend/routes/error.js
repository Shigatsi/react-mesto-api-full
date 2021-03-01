const router = require('express').Router();
const { NotFoundErr } = require('../errors/index');

// eslint-disable-next-line
router.all('/*', (req, res) => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

module.exports = router;
