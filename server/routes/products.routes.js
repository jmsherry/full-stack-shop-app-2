const path = require("path");
const express = require("express");
const logger = require("./../logger");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/product.controller.js");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("./../middleware/authz.middleware");

const {
  CreateProducts,
  DeleteProducts,
  // ReadProducts,
  UpdateProducts,
} = require("../constants").ProductPermission;

const logToken = (req, res, next) => {
  logger.info(`headers ${req.headers}`);
  next();
};

const logUser = (req, res, next) => {
  logger.info(`User ${req.user}`);
  next();
};

router
  .get("/:id?", logToken, logUser, getProducts)
  .post("/", logToken, checkJwt, checkPermissions(CreateProducts), addProduct)
  .put("/:id", checkJwt, checkPermissions(UpdateProducts), updateProduct)
  .delete("/:id", checkJwt, checkPermissions(DeleteProducts), removeProduct);

module.exports = router;
