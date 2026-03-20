# Echo.social

`Echo.social` - это социальное веб-приложение на современном full-stack стеке `Next.js`. Проект объединяет ленту постов, профили пользователей, систему подписок, авторизацию и загрузку аватаров в одном приложении.

## Что Делает Проект

В приложении реализованы:

- регистрация и вход по `email` и паролю
- защищенная часть приложения с доступом по сессии
- лента постов
- создание, удаление и лайки постов
- профили пользователей с редактированием данных
- страницы подписчиков и подписок
- загрузка аватаров через `Cloudinary`
- API routes для бизнес-логики и работы с базой данных

## Технологии Проекта

### Frontend

- `Next.js 15` с `App Router`
- `React 19`
- `TypeScript 5` для строгой типизации
- `Tailwind CSS 4` для утилитарной стилизации
- `Ant Design 5` для UI-компонентов
- `Framer Motion`
- `React Icons`
- `React Spinners` и `react-js-loader`

### Данные И Состояние

- `@tanstack/react-query` для клиентских запросов, кэша и мутаций
- `Prisma ORM` для доступа к данным
- `PostgreSQL` как основная база данных, настроенная в `prisma/schema.prisma`
- `SQLite` можно использовать для быстрого локального запуска без PostgreSQL

### Аутентификация И Безопасность

- `NextAuth.js` с `CredentialsProvider`
- JWT-based стратегия сессий
- `bcrypt` для хэширования паролей
- `jsonwebtoken` для работы с токенами

### Медиа

- `Cloudinary`
- `next-cloudinary`
- `antd-img-crop`

### Качество И Сборка

- `ESLint 9`
- `Turbopack` для локальной разработки и сборки
- `Docker` через multi-stage `Dockerfile`

## Архитектура

Структура проекта близка к `Feature-Sliced Design`:

- `src/app` для роутов, layouts, providers и API-обработчиков
- `src/entities` для доменных сущностей
- `src/features` для пользовательских сценариев и бизнес-действий
- `src/widgets` для составных UI-блоков
- `src/shared` для общих утилит, хуков и UI
- `src/lib` для инфраструктурных модулей, например `Prisma`, `auth` и `Cloudinary`

## Ключевые Технологии По Роли

### `Next.js`

Используется как основной full-stack фреймворк. Отвечает за маршрутизацию, layouts, серверные API routes и рендеринг приложения.

### `React`

Управляет клиентским интерфейсом: лентой, профилями, формами и интерактивными компонентами.

### `TypeScript`

Даёт статическую типизацию компонентам, хукам, API-обработчикам и утилитам.

### `Prisma + PostgreSQL`

Слой данных построен на Prisma-моделях:

- `User`
- `Post`
- `Like`
- `Follow`
- `Chat`
- `ChatLike`

### `NextAuth`

Отвечает за авторизацию, пользовательские сессии и защищённые маршруты. В проекте используется вход по `email` и паролю.

### `React Query`

Управляет загрузкой данных и синхронизацией UI для постов, профилей, лайков и подписок.

### `Ant Design + Tailwind CSS`

Комбинация используется для сборки интерфейса:

- `Ant Design` даёт готовые интерактивные компоненты
- `Tailwind CSS` отвечает за layout, отступы и утилитарную стилизацию

### `Cloudinary`

Используется для загрузки аватаров и хранения изображений. После загрузки файл сохраняется во внешнем хранилище и привязывается к профилю пользователя.

## Запуск Проекта

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создай файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/echo_social"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Применение миграций Prisma

```bash
npx prisma migrate dev
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

После запуска приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Локальный Запуск Без PostgreSQL

По умолчанию проект настроен на `PostgreSQL`, но для быстрого локального запуска можно временно использовать `SQLite` и файл `prisma/dev.db`.

### 1. Измени провайдер в Prisma

В файле `prisma/schema.prisma` замени:

```prisma
provider = "postgresql"
```

на:

```prisma
provider = "sqlite"
```

### 2. Обнови `DATABASE_URL`

В `.env` укажи:

```env
DATABASE_URL="file:./dev.db"
```

Важно: значение `file:./dev.db` создаст базу данных по пути `prisma/dev.db`, потому что путь считается относительно файла `prisma/schema.prisma`.

### 3. Примени схему для SQLite

Текущие SQL-миграции в репозитории сгенерированы под `PostgreSQL`, поэтому для варианта с `SQLite` используй:

```bash
npx prisma db push
```

При необходимости затем обнови Prisma Client:

```bash
npx prisma generate
```

### 4. Запусти проект

```bash
npm run dev
```

Если потом захочешь вернуться на `PostgreSQL`, просто верни `provider = "postgresql"` и прежний `DATABASE_URL`.

## Production Сборка

```bash
npm run build
npm start
```

## Docker

В репозитории есть multi-stage `Dockerfile` для production-сборки.

Пример:

```bash
docker build -t echo-social .
docker run -p 3000:3000 echo-social
```
