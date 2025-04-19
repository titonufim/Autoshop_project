const { Product } = require("../models/models");
const ApiError = require("../error/APIError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const APIError = require("../error/APIError");

class ProductController {
  async create(req, res, next) {
    try {
      const { name, description, price, stock, category_id } = req.body; // получаем данные из тела запроса
      const { image } = req.files; //у каждого товара должно быть его изображение, для этого нужно установить пакет
      let fileName = uuid.v4() + ".jpg"; // генерация рандомного id с исп пакета uuid
      image.mv(path.resolve(__dirname, "..", "static", fileName)); //для перемещения файла в папку static. Можно было указать путь самостоятельно, но воспользуемся path

      const product = await Product.create({ name, description, price, stock, category_id, image: fileName });

      return res.json(product);
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при создании товара"));
    }
  }

  // фильтрацию по категории товара + пагинация
  async getAll(req, res, next) {
    try {
      const { category_id, page = 1, limit = 9 } = req.query;
      let offset = (page - 1) * limit; // Рассчитываем смещение для пагинации
      let product;
      // фильтрация по категории товара
      if (category_id) {
        product = await Product.findAndCountAll({ where: { category_id }, limit, offset });
      } else {
        product = await Product.findAndCountAll({ limit, offset });
      }
      return res.json(product);
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при получении данных о товарах"));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const one_product = await Product.findOne({ where: { id } });

      if (!one_product) {
        return next(ApiError.notFound("Такого товара не найдено"));
      }

      return res.json(one_product);
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при получении товара"));
    }
  }

  // Обновление товара (админ)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category_id } = req.body;
      const product = await Product.findByPk(id);

      if (!product) {
        return next(ApiError.notFound("Такого товара не существует"));
      }

      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = parseInt(price);
      if (stock) product.stock = parseInt(stock);
      if (category_id) product.category_id = parseInt(category_id);

      await product.save();
      return res.json(product);
    } catch (error) {
      return next(ApiError.badRequest("Не получилось обновить данные о товаре"));
    }
  }

  // Удаление товара (админ)
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return next(ApiError.notFound("Товар не найден"));
      }

      // Удаляем изображение из папки static, если оно есть
      if (product.image) {
        const imagePath = path.resolve(__dirname, "..", "static", product.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await product.destroy();
      return res.json({ message: "Товар успешно удален" });
    } catch (error) {
      return next(ApiError.badRequest("Ошибка при удалении товара"));
    }
  }
}

module.exports = new ProductController();
