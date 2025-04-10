const ApiError = require("../error/APIError");

module.exports = function (err, req, res, next) {
  // если класс ошибки ApiError, то:
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Непредвиденная и неизвестная ошибка!" });
};
