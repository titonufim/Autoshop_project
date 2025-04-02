const Router = require("express");
const router = new Router(); // получаем обьект
//const router = express.Router(); // Создаем новый роутер

router.post("/registration"); // для регистрации
router.post("/login"); // для авторизации
router.get("/auth", (req, res) => {
  res.json({ message: "некоторое сообщение" });
}); // проверка: авторизован или неn будет по jwt токену

//router.delete();

module.exports = router;
