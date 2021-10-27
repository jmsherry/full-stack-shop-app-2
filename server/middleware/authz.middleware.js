require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
// const logger = require("./../logger");

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;

console.log("AUTH0_DOMAIN", AUTH0_DOMAIN);
console.log("AUTH0_AUDIENCE", AUTH0_AUDIENCE);

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});
