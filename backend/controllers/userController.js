const { User, Cart } = require("../models/models"); // потребуется модель пользователя и корзины с заказом
const ApiError = require("../error/APIError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// создадим отдельную функцию для генерации JWT-токена
function GenerateToken(id, name, email, role) {
  return jwt.sign({ id, name, email, role }, process.env.SECRET_KEY, { expiresIn: "24h" }); // 1) payload 2) секретный ключ, в .env 3) опция, сколько будет жить токен
}

class UserController {
  async registration(req, res, next) {
    const { name, email, password_hash, role } = req.body;

    if (!email || !password_hash || !name) {
      return next(ApiError.badRequest("Укажите name, email и password!"));
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest("Пользователь с данным email уже существует!"));
    }

    const user = await User.create({ name, email, password_hash, role });
    const cart = await Cart.create({ user_id: user.id });
    const token = GenerateToken(user.id, user.name, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password_hash } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь с данным email не найден"));
    }
    let comparePassword = bcrypt.compareSync(password_hash, user.password_hash);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль!"));
    }
    const token = GenerateToken(user.id, user.name, user.email, user.role); // генерируем токен

    return res.json({ token });
  }

  // Проверка авторизации
  // она генерирует новый токен и отправляет его на клиент
  async check_auth(req, res, next) {
    //return res.json({ message: "все гуд" });
    const token = GenerateToken(req.user.id, req.user.name, req.user.email, req.user.role);
    return res.json({ message: "Пользователь авторизован" });
    // return res.json(token);
  }

  // Получение информации о пользователе (профиль)
  // async getProfile(req, res) {}
  // async updateProfile(req, res) {} // может быть
  // async deleteUser(req, res) {}  // это точно
}

module.exports = new UserController();
