const BadRequestErr = require('./bad-request-err');
const UnauthorizedErr = require('./unauthorized-err');
const ForbidenErr = require('./forbiden-err');
const NotFoundErr = require('./not-found-err');
const ConflictErr = require('./conflict-err');
const InternalServerErr = require('./server-err');

module.exports = {
  BadRequestErr,
  UnauthorizedErr,
  ForbidenErr,
  NotFoundErr,
  ConflictErr,
  InternalServerErr
}
