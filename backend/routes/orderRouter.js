const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", authMiddleware, orderController.create);

router.get("/", authMiddleware, orderController.getUserOrders);

// Получить конкретный заказ
router.get("/:id", authMiddleware, orderController.getOne);

// // Админ может видеть все заказы
router.get("/admin/all", checkRole("admin"), orderController.getAllOrders);

// // Обновить статус заказа ("admin")
router.put("/:order_id", checkRole("admin"), orderController.updateStatus);

module.exports = router;
