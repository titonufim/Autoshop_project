const { Product } = require("../models/models");
const ApiError = require("../error/APIError");
const uuid = require("uuid");
const path = require("path");
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
      next(ApiError.badRequest(error.message));
    }
  }

  // НЕОБХОДИМО СДЕЛАТЬ ПРОВЕРКУ, ЕСЛИ У НАС НЕТ ТАКОЙ КАТЕГОРИИ ТОВАРА, ЧЕРЕЗ try {}catch{}
  // также сделаем фильтрацию по категории товара
  // сделаем вывод по страницам и лимит карточек на стр
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
      next(ApiError.badRequest(error.message));
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
      return next(ApiError.badRequest("error.message"));
    }
  }

  //   // Обновление товара (админ)
  //   async update(req, res) {}

  //   // Удаление товара (админ)
  //   async delete(req, res) {}
}

module.exports = new ProductController();
