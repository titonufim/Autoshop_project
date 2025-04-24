const { Category } = require("../models/models");
const ApiError = require("../error/APIError");

class CategoryController {
  // Создание категории (админ) ТЕСТОВОЕ НЕ ДЛЯ АДМИНА
  async create(req, res, next) {
    try {
      const { category_name } = req.body;
      const category = await Category.create({ category_name });
      return res.json(category);
    } catch (error) {
      return next(ApiError.internal("Ошибка при создании категории"));
    }
  }

  // // Получение всех категорий
  async getAll(req, res) {
    const all_categories = await Category.findAll();
    return res.json(all_categories);
  }

  // // Получение одной категории
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const one_category = await Category.findByPk(id);

      if (!one_category) {
        return next(ApiError.notFound("Данная категория не найдена"));
      }

      return res.json(one_category);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении категории"));
    }
  }

  // // Удаление категории (админ)
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return next(ApiError.notfound("Категория не найдена"));
      }

      await category.destroy();
      return res.json({ message: `Категория "${category.category_name}" успешно удалена` });
    } catch (error) {
      return next(ApiError.internal("Ошибка при удалении категории"));
    }
  }

  // Обновление категории (админ)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { category_name } = req.body;
      const category = await Category.findByPk(id);

      if (!category) {
        return next(ApiError.notFound("Данной категории не существует"));
      }

      category.category_name = category_name;

      await category.save();
      return res.json(category);
    } catch (error) {
      return next(ApiError.internal("Не получилось обновить данные о категории"));
    }
  }
}

module.exports = new CategoryController();
