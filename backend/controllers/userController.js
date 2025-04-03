// будем использовать классы, вместо функций (для удобства)
class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  // Проверка авторизации (например, для фронта)
  async check_auth(req, res) {
    //res.json({ message: "hjgfhkgfkg" });
  }
  // Получение информации о пользователе (профиль)
  async getProfile(req, res) {}
  async updateProfile(req, res) {}
  async deleteUser(req, res) {}
}

module.exports = new UserController();
