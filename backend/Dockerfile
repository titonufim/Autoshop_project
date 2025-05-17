FROM node:22.14.0

WORKDIR /app

# Копируем package.json и package-lock.json
COPY backend/package*.json ./

RUN npm install

COPY backend/ .

EXPOSE 5000

CMD ["npm", "run", "dev"]
