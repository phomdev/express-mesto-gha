// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = 'Unauthorized';
  }
}

module.exports = Unauthorized;
