const Router = require("express");
const router = new Router();
const cartItemController = require("../controllers/cartItemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, cartItemController.add);

router.patch("/:cart_item_id", authMiddleware, cartItemController.decrease);

router.delete("/:cart_item_id", authMiddleware, cartItemController.remove);

module.exports = router;
