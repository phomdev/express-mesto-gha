const jwt = require('jsonwebtoken');

const { Unauthorized } = require('../utils/response-errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.replace('Bearer ', '');
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходимо пройти авторизацию'));
  }

  try {
    payload = jwt.verify(token, 'token-generate-key');
  } catch (err) {
    next(new Unauthorized('Необходимо пройти авторизацию'));
  }

  req.user = payload;
  next();
};
