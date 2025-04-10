// будем использовать классы, вместо функций (для удобства)
class OrderController {
  // Создание заказа
  async create(req, res) {}
  // Получение заказов пользователя
  async getUserOrders(req, res) {}
  // Получение одного заказа
  async getOne(req, res) {}
  // Обновление статуса заказа (админ)
  async updateStatus(req, res) {}
  // Удаление заказа (если допустимо)
  async delete(req, res) {}
}

module.exports = new OrderController();
