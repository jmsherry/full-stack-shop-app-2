const jwtAuthz = require("express-jwt-authz");
const logger = require("./../logger");

exports.checkPermissions = (
  permissions,
  { checkAllScopes = false, failWithError = true } = {}
) => {
  logger.info(`checking permissions ${permissions}`);
  const perms = Array.isArray(permissions) ? permissions : [permissions];

  const hasPermissions = jwtAuthz(perms, {
    // check several?
    customScopeKey: "permissions",
    checkAllScopes,
    failWithError,
  });
  // console.log('hasPermissions', hasPermissions());
  return hasPermissions;
};
