const path = require("path");
const express = require("express");
const logger = require("./../logger");
const router = express.Router();
const {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
  getOwnOrders,
  addOwnOrder,
  updateOwnOrder,
  removeOwnOrder,
} = require("../controllers/order.controller.js");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("./../middleware/authz.middleware");

const {
  CreateOrders,
  DeleteOrders,
  ReadOrders,
  UpdateOrders,
  CreateOwnOrders,
  DeleteOwnOrders,
  ReadOwnOrders,
  UpdateOwnOrders,
} = require("../constants").OrderPermission;

const logToken = (req, res, next) => {
  logger.info(`headers: ${req.headers}`);
  next();
};

router
  .get(
    "/:id?",
    logToken,
    checkJwt,
    checkPermissions(ReadOwnOrders),
    getOwnOrders
  )
  .post("/", logToken, checkJwt, checkPermissions(CreateOwnOrders), addOwnOrder)
  .put("/:id", checkJwt, checkPermissions(UpdateOwnOrders), updateOwnOrder)
  .delete("/:id", checkJwt, checkPermissions(DeleteOwnOrders), removeOwnOrder)
  // Admin
  .get(
    "/admin/:id?",
    logToken,
    checkJwt,
    checkPermissions(ReadOrders),
    getOrders
  )
  .post("/admin/", logToken, checkJwt, checkPermissions(CreateOrders), addOrder)
  .put("/admin/:id", checkJwt, checkPermissions(UpdateOrders), updateOrder)
  .delete("/admin/:id", checkJwt, checkPermissions(DeleteOrders), removeOrder);

module.exports = router;
