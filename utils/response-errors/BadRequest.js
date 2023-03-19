// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'Bad Request';
  }
}

module.exports = BadRequest;
