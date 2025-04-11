const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
});

// Одна корзина принадлежит одному пользователю
// Одна корзина может содержать несколько товаров через CartItem

module.exports = Cart;
