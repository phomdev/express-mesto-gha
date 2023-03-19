// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'Not Found';
  }
}

module.exports = NotFound;
