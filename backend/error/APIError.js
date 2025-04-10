class APIError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(message) {
    return new APIError(484, message); // 1ый параметр - статус код. 484 - код ответа протокола SIP, который означает «Неполный адрес»
  }

  static internal(message) {
    return new APIError(500, message);
  }

  static forbiden(message) {
    return new APIError(403, message);
  }

  static notFound(message) {
    return new APIError(404, message);
  }
}

module.exports = APIError;
