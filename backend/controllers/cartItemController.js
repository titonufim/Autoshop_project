const { Cart, CartItem, Product } = require("../models/models");
const ApiError = require("../error/APIError");

class CartItemController {
  // Добавить товар в корзину
  async add(req, res, next) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      // желаемое количество
      const desired_quantity = quantity ?? 1;

      const cart = await Cart.findOne({ where: { user_id: userId } });
      if (!cart) return next(ApiError.notFound("Корзина не найдена"));

      const product = await Product.findByPk(product_id);
      if (!product) return next(ApiError.notFound("Продукт не найден"));

      if (product.stock < desired_quantity) {
        return next(
          ApiError.badRequest(`Недостаточно товара в наличии. На складе имеется ${product.stock} ед.товара.`)
        );
      }

      // имеющийся в корзине товар
      const existing_item = await CartItem.findOne({
        where: { cart_id: cart.id, product_id },
      });

      if (existing_item) {
        const new_quantity = existing_item.quantity + desired_quantity;

        if (new_quantity > product.stock) {
          return next(
            ApiError.badRequest(`Недостаточно товара в наличии. На складе имеется ${product.stock} ед.товара.`)
          );
        }

        existing_item.quantity = new_quantity;
        await existing_item.save();
      } else {
        await CartItem.create({
          cart_id: cart.id,
          product_id,
          quantity: desired_quantity,
        });
      }

      return res.json({ message: "Товар добавлен в корзину" });
    } catch (error) {
      return next(ApiError.internal("Ошибка при добавлении товара в корзину"));
    }
  }
  // удалить 1
  async decrease(req, res, next) {
    try {
      const userId = req.user.id;
      const { cart_item_id } = req.params;

      const cart = await Cart.findOne({ where: { user_id: userId } });
      if (!cart) return next(ApiError.notFound("Корзина не найдена"));

      const cart_item = await CartItem.findOne({
        where: { id: cart_item_id, cart_id: cart.id },
      });

      if (!cart_item) {
        return next(ApiError.notFound("Данный товар отсутствует в корзине"));
      }

      if (cart_item.quantity > 1) {
        cart_item.quantity -= 1;
        await cart_item.save();
      } else {
        await cart_item.destroy(); // удаляем товар полностью
      }

      return res.json({ message: "Товар обновлён в корзине" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Ошибка при уменьшении количества товара"));
    }
  }

  // Удалить товар из корзины
  async remove(req, res, next) {
    try {
      const { cart_item_id } = req.params;
      const cart_item = await CartItem.findByPk(cart_item_id);
      if (!cart_item) {
        return next(ApiError.notFound("Товар не найден в корзине"));
      }

      await cart_item.destroy();
      return res.json({ message: "Товар удалён из корзины" });
    } catch (error) {
      return next(ApiError.internal("Ошибка при удалении из корзины"));
    }
  }
}

module.exports = new CartItemController();
