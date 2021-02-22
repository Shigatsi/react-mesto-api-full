const router = require('express').Router();

const userRoutes = require('./users.js');
const cardRouters = require('./cards');
const errorRouter = require('./error.js');

const routes = router.use(
  userRoutes,
  cardRouters,
  errorRouter,
);

module.exports = routes;
