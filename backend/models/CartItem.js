const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product");
const Cart = require("./Cart");

const CartItem = sequelize.define("CartItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cart_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cart, key: "id" } },
  product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

// Один товар в корзине связан с одной корзиной
// Один товар в корзине связан с одним товаром

module.exports = CartItem;
