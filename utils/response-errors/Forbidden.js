// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'Forbidden';
  }
}

module.exports = Forbidden;
