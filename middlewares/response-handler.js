module.exports = (err, req, res, next) => {
  const { responseStatus = err.status || 500, message } = err;
  res.status(responseStatus).send({ message: responseStatus === 500 ? 'На сервере произошла ошибка, свяжитесь с администратором' : message });
  next();
};
