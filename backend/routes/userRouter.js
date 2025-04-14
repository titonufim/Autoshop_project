const Router = require("express");
const router = new Router(); // получаем обьект
const userController = require("../controllers/userController"); // импорт контроллера
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration); // для регистрации
router.post("/login", userController.login); // для авторизации
router.get("/auth", authMiddleware, userController.check_auth);

// !!!ДОПОЛНИТЬ!!!!  ТАКЖЕ ДЛЯ ДРУГИХ

//так бы выглядело, если бы мы не использовали контроллеры
// router.get("/auth", (req, res) => {
//   res.json({ message: "некоторое тестовое сообщение" });
// }); // проверка: авторизован или неn будет по jwt токену

//router.delete();

module.exports = router;
