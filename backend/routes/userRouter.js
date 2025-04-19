const Router = require("express");
const router = new Router(); // получаем обьект
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check_auth);
router.get("/", checkRole("admin"), userController.getAll);
router.delete("/", authMiddleware, userController.delete);

module.exports = router;
