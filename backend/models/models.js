const sequelize = require("../config/db");

const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Order = require("./Order");
const Cart = require("./Cart");

module.exports = { sequelize, User, Product, Category, Order, Cart };
