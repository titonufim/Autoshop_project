const { Order, OrderItem, Cart, CartItem, Product, User } = require("../models/models");
const ApiError = require("../error/APIError");
const { Op } = require("sequelize");

class OrderController {
  async create(req, res, next) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({
        where: { user_id: userId },
        include: [{ model: CartItem, include: [Product] }],
      });

      if (!cart || cart.CartItems.length === 0) {
        return next(ApiError.badRequest("Корзина пуста или не существует"));
      }

      // Проверка наличия на складе
      for (const item of cart.CartItems) {
        if (item.quantity > item.Product.stock) {
          return next(ApiError.badRequest(`Недостаточно товара: ${item.Product.name}`));
        }
      }

      // общей суммы
      // метод массива, который проходит по всем элементам и накапливает результат
      const totalPrice = cart.CartItems.reduce((sum, item) => {
        return sum + item.quantity * item.Product.price;
      }, 0);

      // Создание заказа
      const order = await Order.create({
        user_id: userId,
        total_price: totalPrice,
        status: "pending",
      });

      // Создание OrderItem и обновление остатков
      for (const item of cart.CartItems) {
        await OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
        });

        item.Product.stock -= item.quantity;
        await item.Product.save();

        await item.destroy(); // очистка корзины
      }

      const createdOrder = await Order.findOne({
        where: { id: order.id },
        include: [
          { model: OrderItem, include: [Product] },
          { model: User, attributes: ["id", "email"] },
        ],
      });

      return res.json(createdOrder); // Теперь возвращаем сам заказ

      //return res.json({ message: `Заказ №${order.id} успешно создан` });
    } catch (error) {
      return next(ApiError.internal("Ошибка при создании заказа"));
    }
  }

  // заказы текущего пользователя
  async getUserOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [{ model: OrderItem, include: [Product] }],
        order: [["createdAt", "DESC"]],
      });

      return res.json(orders);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении заказов"));
    }
  }

  // конкретный заказ
  async getOne(req, res, next) {
    try {
      const orderId = req.params.id;
      const userId = req.user.id;

      const order = await Order.findOne({
        where: { id: orderId, user_id: userId },
        include: [{ model: OrderItem, include: [Product] }],
      });

      if (!order) return next(ApiError.notFound("Заказ не найден"));

      return res.json(order);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении заказа"));
    }
  }

  // все заказы (админ)
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: OrderItem, include: [Product] },
          { model: User, attributes: ["id", "email"] },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.json(orders);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении заказов"));
    }
  }

  // Обновление статуса (админ)
  async updateStatus(req, res, next) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(order_id);
      if (!order) return next(ApiError.notFound("Заказ не найден"));

      order.status = status;
      await order.save();

      return res.json({ message: "Статус заказа обновлён" });
    } catch (error) {
      return next(ApiError.internal("Ошибка при обновлении статуса"));
    }
  }

  // // Удаление всех заказов и orderItems
  // async deleteAllOrders(req, res, next) {
  //   try {
  //     // Удаляем все элементы заказов (OrderItems)
  //     await OrderItem.destroy({ where: {} });

  //     // Удаляем все заказы
  //     await Order.destroy({ where: {} });

  //     return res.json({ message: "Все заказы и элементы заказов успешно удалены" });
  //   } catch (error) {
  //     return next(ApiError.internal("Ошибка при удалении всех заказов"));
  //   }
  // }
}

module.exports = new OrderController();
