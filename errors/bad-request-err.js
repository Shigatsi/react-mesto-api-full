class BadRequestErr extends Error {
  constructor (message) {
    super (message);
    this.message = message;
    this.statusCode = 400;
  }
};

module.exports = BadRequestErr;
