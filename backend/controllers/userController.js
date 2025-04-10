const ApiError = require("../error/APIError");

// будем использовать классы, вместо функций (для удобства)
class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  // Проверка авторизации (например, для фронта)
  async check_auth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан id"));
    }
    res.json(id);
  }

  // Получение информации о пользователе (профиль)
  // async getProfile(req, res) {}
  // async updateProfile(req, res) {}
  // async deleteUser(req, res) {}
}

module.exports = new UserController();
