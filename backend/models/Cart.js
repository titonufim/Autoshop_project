const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./Order");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: "id" } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

Order.belongsToMany(Product, { through: Cart, foreignKey: "order_id" });
Product.belongsToMany(Order, { through: Cart, foreignKey: "product_id" });

module.exports = Cart;
