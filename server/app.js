require("dotenv").config();
const express = require("express");
const app = express();
const {} = process.env;

require("./database");
require("./middleware")(app);
require("./routes")(app);

module.exports = app;