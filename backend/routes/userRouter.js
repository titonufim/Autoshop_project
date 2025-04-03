const Router = require("express");
const router = new Router(); // получаем обьект
//const router = express.Router(); // Создаем новый роутер
const userController = require("../controllers/userController"); // импорт контроллера

router.post("/registration", userController.registration); // для регистрации
router.post("/login", userController.login); // для авторизации
router.get("/auth", userController.check_auth);

// !!!ДОПОЛНИТЬ!!!!  ТАКЖЕ ДЛЯ ДРУГИХ

// так бы выглядело, если бы мы не использовали контроллеры
// router.get("/auth", (req, res) => {
//   res.json({ message: "некоторое сообщение" });
// }); // проверка: авторизован или неn будет по jwt токену

//router.delete();

module.exports = router;
