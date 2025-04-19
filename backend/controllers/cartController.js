const { Cart, CartItem, Product } = require("../models/models");
const ApiError = require("../error/APIError");

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await Cart.findOne({
        where: { user_id: req.user.id },
        include: [{ model: CartItem, include: [Product] }],
      });
      return res.json(cart);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении корзины"));
    }
  }

  async clearCart(req, res, next) {
    try {
      const cart = await Cart.findOne({ where: { user_id: req.user.id } });
      if (!cart) {
        return next(ApiError.notFound("Корзина не найдена"));
      }
      await CartItem.destroy({ where: { cart_id: cart.id } });
      return res.json({ message: "Корзина очищена" });
    } catch (error) {
      return next(ApiError.internal("Ошибка при очистке корзины"));
    }
  }
}

module.exports = new CartController();
