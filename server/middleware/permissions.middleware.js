const jwtAuthz = require("express-jwt-authz");

exports.checkPermissions = (permissions) => {
  console.log('checking permissions', permissions);
  const hasPermissions = jwtAuthz([permissions], {
    customScopeKey: "permissions",
    checkAllScopes: true,
    failWithError: true
  });
  // console.log('hasPermissions', hasPermissions());
  return hasPermissions
};