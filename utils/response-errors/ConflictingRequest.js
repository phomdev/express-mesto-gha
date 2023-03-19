// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
class ConflictingRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = 'Conflicting Request';
  }
}

module.exports = ConflictingRequest;
