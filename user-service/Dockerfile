FROM node:20

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости внутри контейнера
RUN npm install

# Копируем весь проект
COPY . .

EXPOSE 3001

# Запуск приложения
CMD ["npm", "start"]
