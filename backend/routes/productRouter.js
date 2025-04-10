const Router = require("express");
const ProductController = require("../controllers/productController");

const router = new Router(); // получаем обьект

router.post("/", ProductController.create); // для создания
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOne); // для получения
//router.delete("/:id");

module.exports = router;

// router.post("/", authMiddleware, adminMiddleware, ProductController.create);
// router.get("/", ProductController.getAll);
// router.get("/:id", ProductController.getOne);
// router.put("/:id", authMiddleware, adminMiddleware, ProductController.update);
// router.delete("/:id", authMiddleware, adminMiddleware, ProductController.delete);
