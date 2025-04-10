const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category, key: "category_id" } },
});

Product.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Product;
