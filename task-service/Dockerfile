# Dockerfile для task-service
FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости с флагом --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Копируем все файлы в контейнер
COPY . .

EXPOSE 3002

# Запускаем приложение
CMD ["npm", "start"]

