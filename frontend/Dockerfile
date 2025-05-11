# Используем образ Node.js с нужной версией (v22.14.0)
FROM node:22.14.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY frontend/ .

# Строим фронтенд
RUN npm run build

# Открываем порт для frontend
EXPOSE 3000

# Запускаем фронтенд
CMD ["npm", "start"]
