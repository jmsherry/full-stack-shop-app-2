function errorHandler(res, err, status = 500) {
  return res.status(status).send(err);
}

exports.errorHandler = errorHandler;
