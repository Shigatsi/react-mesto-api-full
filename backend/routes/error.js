const router = require('express').Router();
const { NotFoundErr } = require('../errors/index')

router.all('/*', (req, res) => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден')
});

module.exports = router;
