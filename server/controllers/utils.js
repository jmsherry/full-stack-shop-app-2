const logger = require("./../logger");
function errorHandler(res, err, status = 500) {
  logger.error(err);
  return res.status(status).send(err);
}

exports.errorHandler = errorHandler;
