# Используем образ Node.js с нужной версией (v22.14.0)
FROM node:22.14.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY backend/ .

# Открываем порт для backend
EXPOSE 5000

# Запуск приложения
CMD ["npm", "run", "dev"]
