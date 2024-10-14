### Документация к проекту: **Task Management System**

## Оглавление:
1. [Описание проекта](#описание-проекта)
2. [Архитектура проекта](#архитектура-проекта)
3. [Структура директорий](#структура-директорий)
4. [Микросервисы](#микросервисы)
    - [User Service](#user-service)
    - [Task Service](#task-service)
5. [База данных](#база-данных)
6. [Конфигурация и переменные окружения](#конфигурация-и-переменные-окружения)
7. [Тестирование проекта](#тестирование-проекта)
    - [Запуск и тестирование API с помощью Postman/curl](#запуск-и-тестирование-api-с-помощью-postman-curl)
    - [Юнит и интеграционное тестирование](#юнит-и-интеграционное-тестирование)
8. [Команды для запуска и сборки](#команды-для-запуска-и-сборки)
9. [Дополнительные ресурсы и документация](#дополнительные-ресурсы-и-документация)

---

## Описание проекта

**Task Management System** — это система управления задачами с микросервисной архитектурой, которая позволяет пользователям регистрироваться, авторизоваться и управлять своими задачами. Проект состоит из двух основных микросервисов:
- **User Service** (служба пользователей)
- **Task Service** (служба задач)

Цель проекта — продемонстрировать микросервисную архитектуру, а также использовать различные инструменты, такие как Docker, MySQL, и ORM Sequelize, для построения REST API.

---

## Архитектура проекта

Проект построен по микросервисной архитектуре. Это означает, что каждый компонент системы (например, работа с пользователями и управление задачами) выделен в отдельные микросервисы, что упрощает масштабирование и независимую разработку компонентов.

Основные компоненты:
- **User Service** — обрабатывает регистрацию и аутентификацию пользователей.
- **Task Service** — обрабатывает создание, обновление и удаление задач, а также взаимодействие с пользователями.

Микросервисы общаются с базой данных MySQL и используют Docker для контейнеризации. Каждый сервис подключается к отдельной базе данных, но Task Service имеет внешние ключи, связанные с пользователями, для обеспечения целостности данных.

---

## Структура директорий

Проект организован следующим образом:

```
/project-root
│
├── /frontend                # Интерфейс (если он есть)
├── /user-service            # Сервис для управления пользователями
│   ├── src
│   │   ├── controllers      # Контроллеры (API endpoints)
│   │   ├── models           # Модели базы данных
│   │   ├── routes           # Определение маршрутов (endpoints)
│   │   └── services         # Бизнес-логика (например, AuthService)
│   ├── Dockerfile           # Конфигурация Docker для User Service
│   └── package.json         # Зависимости и скрипты для User Service
│
├── /task-service            # Сервис для управления задачами
│   ├── src
│   │   ├── controllers      # Контроллеры (API endpoints)
│   │   ├── models           # Модели базы данных
│   │   ├── routes           # Определение маршрутов (endpoints)
│   │   └── services         # Бизнес-логика
│   ├── Dockerfile           # Конфигурация Docker для Task Service
│   └── package.json         # Зависимости и скрипты для Task Service
│
├── docker-compose.yml       # Основной файл Docker Compose для всего проекта
└── README.md                # Основная документация проекта
```

---

## Микросервисы

### User Service

**User Service** отвечает за работу с пользователями, включая их регистрацию, аутентификацию и управление учетными записями.

#### Основные эндпоинты:
1. **POST /api/users/register** — регистрация нового пользователя.
2. **POST /api/users/login** — аутентификация пользователя и получение токена JWT.

**JWT** (JSON Web Token) используется для аутентификации пользователей, чтобы Task Service мог проверять пользователя по токену.

#### Основные компоненты:
- **authService.js**: Логика аутентификации и генерации JWT.
- **userController.js**: Обработка входящих HTTP-запросов.
- **userModel.js**: Модель пользователя, которая включает `id`, `email`, `fullName`, `password`.

### Task Service

**Task Service** управляет задачами пользователей, предоставляя API для их создания, обновления и удаления.

#### Основные эндпоинты:
1. **GET /api/tasks** — получение всех задач для авторизованного пользователя.
2. **POST /api/tasks** — создание новой задачи.
3. **PUT /api/tasks/:id** — обновление существующей задачи.
4. **DELETE /api/tasks/:id** — удаление задачи.

#### Основные компоненты:
- **taskService.js**: Бизнес-логика работы с задачами.
- **taskController.js**: Обработка входящих HTTP-запросов.
- **taskModel.js**: Модель задачи, включающая `id`, `title`, `description`, `deadlineDate`, `status`, `userId`.

#### Связь с пользователями:
Task Service использует внешний ключ `userId` для привязки задачи к конкретному пользователю. Это обеспечивает целостность данных и гарантирует, что задачи принадлежат авторизованным пользователям.

---

## База данных

Проект использует базу данных **MySQL**. Оба микросервиса подключаются к базе данных `mydb` и имеют свои таблицы:
- Таблица `users` в **User Service** содержит информацию о пользователях.
- Таблица `tasks` в **Task Service** содержит задачи пользователей и связана внешним ключом `userId` с таблицей `users`.

Пример структуры таблиц:

1. **Таблица users**:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) NOT NULL,
     fullName VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL
   );
   ```

2. **Таблица tasks**:
   ```sql
   CREATE TABLE tasks (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     deadlineDate DATETIME,
     status ENUM('pending', 'completed') DEFAULT 'pending',
     userId INT,
     FOREIGN KEY (userId) REFERENCES users(id)
   );
   ```

---

## Конфигурация и переменные окружения

Проект использует **dotenv** для управления переменными окружения. Основные переменные, которые нужно настроить в файле `.env`:
- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DB`

Пример `.env` файла для User Service:
```
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=mydb
PORT=3001
JWT_SECRET=mysecretkey
```

Пример `.env` файла для Task Service:
```
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=mydb
PORT=3002
JWT_SECRET=mysecretkey
```

---

## Тестирование проекта

### Запуск и тестирование API с помощью Postman/curl

1. Запустите проект через Docker:
   ```bash
   docker-compose up --build
   ```

2. **Тестирование User Service**:
    - Регистрация пользователя:
      ```bash
      curl -X POST http://localhost:3001/api/users/register -H "Content-Type: application/json" -d '{"email": "test@test.com", "fullName": "Test User", "password": "password123"}'
      ```

    - Авторизация пользователя:
      ```bash
      curl -X POST http://localhost:3001/api/users/login -H "Content-Type: application/json" -d '{"email": "test@test.com", "password": "password123"}'
      ```

3. **Тестирование Task Service**:
    - Создание новой задачи:
      ```bash
      curl -X POST http://localhost:3002/api/tasks -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task description", "deadlineDate": "2024-12-01"}'
      ```

    - Получение всех задач:
      ```bash
      curl -X GET http://localhost:3002/api/tasks -H "Authorization: Bearer <JWT_TOKEN>"
      ```

### Юнит и интеграционное тестирование

Для тестирования с использованием **Mocha** и **Chai**:
1. Установите зависимости:
   ```bash
   npm install --dev mocha chai supertest
   ```

2. Напишите тесты в директории `/test`, например:
   ```javascript
   describe('User Registration', () => {
     it('should register

a user', (done) => {
chai.request(server)
.post('/api/users/register')
.send({
email: 'test@test.com',
fullName: 'Test User',
password: 'password123'
})
.end((err, res) => {
res.should.have.status(200);
done();
});
});
});
   ```

3. Запустите тесты:
   ```bash
   npm test
   ```

---

## Команды для запуска и сборки

1. **Сборка Docker-контейнеров**:
   ```bash
   docker-compose up --build
   ```

2. **Запуск проекта в режиме разработки**:
   Для каждого сервиса отдельно:
   ```bash
   npm start
   ```

3. **Запуск тестов**:
   ```bash
   npm test
   ```

---

## Дополнительные ресурсы и документация

- **Sequelize Documentation**: [https://sequelize.org/](https://sequelize.org/)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **JWT Documentation**: [https://jwt.io/](https://jwt.io/)