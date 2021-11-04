const Order = require("../models/order/order.model");
const { errorHandler } = require("./utils");
const logger = require("./../logger");

exports.getOrders = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Order.find(query).populate('items').exec((err, orders) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && orders.length === 0)
      return res.status(404).send({ message: "No order with that ID" });
    return res.status(200).json(orders);
  });
};

exports.getOwnOrders = function (req, res) {
  let query = {
    customerID: req.user.sub, // ensure own orders only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Order.find(query).populate('items').exec((err, orders) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && orders.length === 0)
      return res.status(404).send({ message: "No order with that ID" });
    return res.status(200).json(orders);
  });
};

exports.addOrder = function (req, res) {
  const orderData = req.body;
  logger.info(`orderData ${orderData}`);
  const newOrder = new Order({orderData});
  newOrder.save((err, order) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(order);
  });
};

exports.addOwnOrder = function (req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const orderData = {...req.body, customerID: req.user.sub};
  logger.info(`orderData ${orderData}`);
  const newOrder = new Order(orderData);
  newOrder.save((err, order) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(order);
  });
};

exports.updateOrder = function (req, res) {
  Order.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No order with that ID" });
    res.sendStatus(200);
  });
};

exports.updateOwnOrder = function (req, res) {
  Order.updateOne({ _id: req.params.id, owner: req.user.sub }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No order with that ID" });
    res.sendStatus(200);
  });
};

exports.removeOrder = function (req, res) {
  const orderId = req.params.id;
  Order.deleteOne({ _id: orderId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (orderId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No order with that ID" });
    }
    res.sendStatus(204);
  });
};

exports.removeOwnOrder = function (req, res) {
  const orderId = req.params.id;
  Order.deleteOne({ _id: orderId , owner: req.user.sub }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (orderId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No order with that ID" });
    }
    res.sendStatus(204);
  });
};
