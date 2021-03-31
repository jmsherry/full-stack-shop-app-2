const path = require("path");

module.exports = function (app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";
  // app.use(`${API_ENDPOINT}/${API_VERSION}/orders`, require("./products.routes"));
  app.use(`${API_ENDPOINT}/${API_VERSION}/products`, require("./products.routes"));
  // app.use(`${API_ENDPOINT}/${API_VERSION}/customers`, require("./customers.routes"));

  //! Todo handle ajax 404 vs static files
  app.get("*", (req, res) => {
    if(req.xhr) {
      return res.sendStatus(404);
    }
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../../client/", "build/index.html"));
    }
  });

  app.get('', (req, res) => {
    res.redirect();
  })
  
  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};
