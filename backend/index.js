require("dotenv").config(); // для считывания файла .env

const express = require("express"); // импорт
const sequelize = require("./config/db"); // импорт из db
const models = require("./models/models"); // Просто импортируем, чтобы загрузить модели

const PORT = process.env.PORT; // получаем порт из переменных окружения

const app = express(); // создаем объект

// функция для подключения к базе данных
const start = async () => {
  // все операции над бд асинхронны
  try {
    await sequelize.authenticate(); // функция обьекта для подключения к БД
    await sequelize.sync(); // сверяет состояние бд со схемой данных
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)); // указываем какой порт должен прослушивать наш сервер
  } catch (e) {
    console.log(e);
  }
};

start();
