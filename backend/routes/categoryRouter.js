const Router = require("express");
const router = new Router();
const CategoryController = require("../controllers/categoryController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("admin"), CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getOne);
router.put("/:id", checkRole("admin"), CategoryController.update);
router.delete("/:id", checkRole("admin"), CategoryController.delete);

module.exports = router;
