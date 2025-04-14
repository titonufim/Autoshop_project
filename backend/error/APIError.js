class APIError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  // 400 — Неверный запрос (например, не хватает полей)
  static badRequest(message) {
    return new APIError(400, message);
  }

  // 401 — Неавторизован (неверный токен или не вошел в систему)
  static unauthorized(message) {
    return new APIError(401, message);
  }

  // 403 — Запрещено (нет прав доступа)
  static forbidden(message) {
    return new APIError(403, message);
  }

  // 404 — Не найдено (например, товар или пользователь)
  static notFound(message) {
    return new APIError(404, message);
  }

  // 409 — Конфликт (например, email уже занят)
  static conflict(message) {
    return new APIError(409, message);
  }

  // 500 — Внутренняя ошибка сервера
  static internal(message) {
    return new APIError(500, message);
  }
}

module.exports = APIError;
