const Router = require("express");
const router = new Router(); // получаем обьект

const userRouter = require("./userRouter"); // импортируем роутеры
// const productRouter = require("./productRouter");
// const categoryRouter = require("./categoryRouter");
// const orderRouter = require("./orderRouter");
// const cartRouter = require("./cartRouter");

// сопоставляем маршруты к соответствующим роутерам
router.use("/user", userRouter);
// router.use("/product", productRouter);
// router.use("/category", categoryRouter);
// router.use("/order", orderRouter);
// router.use("/cart", cartRouter);

module.exports = router;
