const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/response-errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const userToken = authorization.replace('Bearer ', '');
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) { next(new Unauthorized('Для доступа необходимо пройти авторизацию')); }

  try {
    payload = jwt.verify(userToken, 'token-generate-key');
  } catch (error) { next(new Unauthorized('Для доступа необходимо пройти авторизацию')); }

  req.user = payload;
  next();
};
