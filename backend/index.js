require("dotenv").config(); // для считывания файла .env

const express = require("express");
const sequelize = require("./config/db"); // импорт из db
const models = require("./models/models"); // Просто импортируем, чтобы загрузить модели
const cors = require("cors"); // для отправления запросов с браузера
const router = require("./routes/index");

const PORT = process.env.PORT; // получаем порт из переменных окружения

const app = express(); // создаем объект
app.use(express.json()); // для парсинга json формата
app.use(cors());
app.use("/api", router); // url по которому роутер должен обрабатываться

//для проверки
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Работа get метода" }); // status code клиент в зависимости от ситуации говорит как произошел запрос 200 - запрос произошел без ошибок
// }); // маршрутизация, первый get метод 1 параметр - URL
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
