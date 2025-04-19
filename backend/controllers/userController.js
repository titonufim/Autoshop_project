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
    try {
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
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при регистрации"));
    }
  }

  async login(req, res, next) {
    try {
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
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при входе в аккаунт"));
    }
  }

  async getAll(req, res, next) {
    try {
      const all_users = await User.findAll();
      return res.json(all_users);
    } catch (error) {
      return next(ApiError.badRequest("Непредвиденная ошибка"));
    }
  }

  // Проверка авторизации она генерирует новый токен и отправляет его на клиент
  async check_auth(req, res, next) {
    //return res.json({ message: "все гуд" });
    const token = GenerateToken(req.user.id, req.user.name, req.user.email, req.user.role);
    // return res.json({ message: "Пользователь авторизован" });
    return res.json(token);
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }

      // Удаляем связанную корзину
      const cart = await Cart.findOne({ where: { user_id: userId } });
      if (cart) {
        await cart.destroy();
      }

      // ?Удаление заказов? хотя не нужно по сути

      await user.destroy();

      return res.json({ message: "Аккаунт успешно удален" });
    } catch (error) {
      console.error(error);
      return next(ApiError.badRequest("Ошибка при удалении пользователя"));
    }
  }
}

module.exports = new UserController();
