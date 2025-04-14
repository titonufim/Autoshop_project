const ApiError = require("../error/APIError");
const jwt = require("jsonwebtoken");

// про замыкания прочитать
module.exports = function (role) {
  return function (req, res, next) {
    // проверка, если метод OPtions, то пропускаем
    if (req.method == "OPTIONS") {
      return next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; // из хедера нужно выцепить сам токен, но в хэдер обычно помещают тип токена, затем сам токен, по первому индексу получаем сам токен
      // токен обычно помещают в headers authorization
      if (!token) {
        return next(ApiError.unauthorized("Пользователь не авторизован!"));
      }
      // если токен есть, то мы его раскодируем
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // проверка токена на валидность
      if (decoded.role !== role) {
        return next(ApiError.forbidden("Доступ запрещен, только для администратора!"));
      }
      req.user = decoded;
      next(); // вызов следующего в цепочке middleware
    } catch (error) {
      return next(ApiError.unauthorized("Пользователь не авторизован!"));
    }
  };
};
