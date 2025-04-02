// конфигурация подключения к БД
const { Sequelize } = require("sequelize"); // импорт, со взятием конкретного класса Sequelize (Деструктуризация)

const config = require("../config/config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  process.env.DB_NAME || config.database,
  process.env.DB_USER || config.username,
  process.env.DB_PASSWORD || config.password,
  {
    host: process.env.DB_HOST || config.host,
    port: process.env.DB_PORT || config.port,
    dialect: config.dialect,
  }
);

module.exports = sequelize;
