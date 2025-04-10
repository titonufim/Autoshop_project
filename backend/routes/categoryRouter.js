const Router = require("express");
const router = new Router();
const CategoryController = require("../controllers/categoryController");

router.post("/", CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);

router.delete("/:id", CategoryController.delete);

module.exports = router;

// router.put("/:id", authMiddleware, adminMiddleware, CategoryController.update);
// router.delete("/:id", authMiddleware, adminMiddleware, CategoryController.delete);
