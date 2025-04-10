require("dotenv").config(); // для считывания файла .env

const express = require("express");
const sequelize = require("./config/db"); // импорт из db
const models = require("./models/models"); // Просто импортируем, чтобы загрузить модели
const cors = require("cors"); // для отправления запросов с браузера
const router = require("./routes/index"); // импорт роутеров  маршрутами
const fileUpload = require("express-fileupload");
const path = require("path");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT; // получаем порт из переменных окружения

const app = express(); // создаем объект
app.use(express.json()); // для парсинга json формата
app.use(fileUpload({})); // в функцию передаем пустой обьект с опциями
app.use(express.static(path.resolve(__dirname, "static"))); // явно указываем, что файлы из static исп как статику
app.use(cors());
app.use("/api", router); // пример url по которому роутер должен обрабатываться

app.use(errorHandler); // Обработка ошибок, данный Middleware идет в самом конце

// // про маршрутизацию express тут: https://expressjs.com/ru/guide/routing.html

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
