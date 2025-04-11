const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product");
const Order = require("./Order");

const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: "id" } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

// Один товар в заказе относится к одному заказу
// Один товар в заказе относится к одному товару

module.exports = OrderItem;
