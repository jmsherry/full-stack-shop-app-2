const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require('morgan');

module.exports = function (app) {
  // In dev mode, react-server serves the files BUT in production we BUILD the react project and express serves it out of the build folder
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "build")));
    app.use(compression());
  }

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // Helmet for security
  app.use(helmet());
  // CORS to make our API public
  app.use(cors());

  // http logging
  app.use(morgan('dev'));

};
