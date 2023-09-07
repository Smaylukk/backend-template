# ts-koa-seq-mysql-auth
Додаток по-замовчуванню має:
* Аутентифікація - реєстрація/авторизація під користувачами за допомогою jwt + Redis
* * /api/user/reg - реєстрація
* * /api/user/login - авторизація
* * /api/user/auth - перевірка accessToken
* * /api/user/refresh - оновлення accessToken
* Rest-API для задач ToDo-list
* * post /api/todo - створення
* * get /api/todo - отримання колекції записів
* * get /api/todo/:id - отримання 1 запису по ідентифікатору
* * put /api/todo/:id - оновлення 1 запису по ідентифікатору
* * delete /api/todo/:id - видалення 1 запису по ідентифікатору
* Перевірка авторизації
* Валідація вхідних даних
* Реалізовані тести
* Docker для БД

## Використано
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Koa.js](https://img.shields.io/badge/koa.js-%234d59.svg?style=for-the-badge&logoColor=%2361DAFB)
* ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
* ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
* ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
* ![Auth](https://img.shields.io/badge/Auth-%23DD5431.svg?style=for-the-badge&logo=user&logoColor=white)

Для запуску потрібно:
* Клонувати гілку
* `docker-compose up`
* `yarn start` or `npm start`
