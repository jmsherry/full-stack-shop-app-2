const Product = require("../models/product/product.model");
const { errorHandler } = require("./utils");
const logger = require("./../logger");

exports.getProducts = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Product.find(query).exec((err, products) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && products.length === 0)
      return res.status(404).send({ message: "No product with that ID" });
    return res.status(200).json(products);
  });
};

exports.addProduct = function (req, res) {
  const productData = req.body;
  logger.info(`productData ${productData}`);
  logger.info(`user ${req.user}`);
  const newProduct = new Product(productData);
  newProduct.save((err, product) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(product);
  });
};

exports.updateProduct = function (req, res) {
  Product.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No product with that ID" });
    res.sendStatus(200);
  });
};

exports.removeProduct = function (req, res) {
  const productId = req.params.id;
  Product.deleteOne({ _id: productId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (productId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No product with that ID" });
    }
    res.sendStatus(204);
  });
};
