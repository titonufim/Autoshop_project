const Router = require("express");
const ProductController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");
const router = new Router(); // получаем обьект

router.post("/", checkRole("admin"), ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne);
router.put("/:id", checkRole("admin"), ProductController.update);
router.delete("/:id", checkRole("admin"), ProductController.delete);

module.exports = router;
