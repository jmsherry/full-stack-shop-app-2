exports.productCategories = ["starter", "main", "dessert", "beverage"];

exports.OrderPermission = Object.freeze({
  CreateOrders: "create:orders",
  DeleteOrders: "delete:orders",
  ReadOrders: "read:orders",
  UpdateOrders: "update:orders",
  CreateOwnOrders: "create:orders:own",
  DeleteOwnOrders: "delete:orders:own",
  ReadOwnOrders: "read:orders:own",
  UpdateOwnOrders: "update:orders:own"
});

exports.ProductPermission = Object.freeze({
  CreateProducts: "create:products",
  DeleteProducts: "delete:products",
  ReadProducts: "read:products",
  UpdateProducts: "update:products",
});
