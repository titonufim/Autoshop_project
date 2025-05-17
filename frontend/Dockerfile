FROM node:22.14.0

WORKDIR /app

# Копируем package.json и package-lock.json
COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
