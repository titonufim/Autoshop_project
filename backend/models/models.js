const sequelize = require("../config/db");

const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Order = require("./Order");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const OrderItem = require("./OrderItem");

// Здесь вызываются все связи после загрузки моделей, иначе не создается да и так правильнее
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

module.exports = { sequelize, User, Product, Category, Order, Cart, CartItem, OrderItem };
