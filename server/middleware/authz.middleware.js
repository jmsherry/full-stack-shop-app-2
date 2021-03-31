const jwt = require( "express-jwt");
const jwksRsa = require( "jwks-rsa");
// require("dotenv").config();
// const {} = process.env;

console.log('AUTH0_DOMAIN', process.env.AUTH0_DOMAIN);
console.log('AUTH0_AUDIENCE', process.env.AUTH0_AUDIENCE)

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});