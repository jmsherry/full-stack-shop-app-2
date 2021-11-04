const express = require("express");
const app = express();
const {} = process.env;

require("./middleware")(app);
require("./database");
require("./routes")(app);

module.exports = app;