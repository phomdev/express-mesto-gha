const responseHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка, свяжитесь с администратором' : message });
  next();
});

module.exports = responseHandler;
