const mongoose = require("mongoose");
const logger = require("./logger");

// TODO! change localDBName name to match your local db!!
const localDBName = "shop";
const { MONGODB_URI = `mongodb://localhost/${localDBName}` } = process.env;

logger.info(`MONGODB_URI ${MONGODB_URI}`);

const promise = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Googled
  })
  .then(function (db) {
    logger.info(`Database Connected: ${MONGODB_URI}`);
  })
  .catch(function (err) {
    logger.info(`CONNECTION ERROR ${err}`);
  });
