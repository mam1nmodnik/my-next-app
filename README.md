# 🚀 Service For Publications

Современное веб-приложение, созданное на **Next.js 15 (Turbopack)** с использованием **TypeScript**, **Prisma ORM**, **NextAuth** и **Ant Design**.  
Проект построен с акцентом на масштабируемость, удобство разработки и современный стек технологий.

---

## 📦 Технологический стек

### 🔹 Frontend
- **Next.js 15.5.3** — фреймворк для React с поддержкой SSR и SSG  
- **React 19** — современная версия React  
- **TypeScript 5** — строгая типизация  
- **Tailwind CSS 4** — утилитарный CSS-фреймворк  
- **Ant Design 5** — библиотека компонентов UI  
- **Framer Motion** — анимации и плавные переходы  
- **React Icons** — коллекция иконок  
- **React Spinners** и **React JS Loader** — индикаторы загрузки  

---

### 🔹 Backend
- **NextAuth 4** — аутентификация и управление сессиями  
- **Prisma 6.17.1** — ORM для работы с базой данных  
- **SQLite / PostgreSQL / MySQL** — поддерживаемые базы данных  
- **bcrypt** — хэширование паролей  
- **jsonwebtoken** — работа с JWT-токенами  

---

### 🔹 Dev-инструменты
- **ESLint 9** — анализ качества кода  
- **Tailwind PostCSS** — интеграция Tailwind с PostCSS  
- **TypeScript Types (@types/react, @types/node)** — типы для разработки  
- **Turbopack** — сверхбыстрая сборка проекта  

---

## ⚙️ Установка и запуск

### 1. Клонирование репозитория
```
git clone https://github.com/USERNAME/my-next-app.git
cd my-next-app
```
### 2. Установка зависимостей
```
npm install
```
### 3. Настройка переменных окружения
Создай файл .env в корне проекта и добавь:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```
💡 Если используешь PostgreSQL или MySQL — замени DATABASE_URL на соответствующий адрес.
### 4. Применение миграций базы данных
```
npx prisma migrate dev
```
### 5. Запуск проекта в режиме разработки
```
npm run dev
```
После запуска проект будет доступен по адресу:

👉 [http://localhost:3000](http://localhost:3000)
### 📁 Структура проекта
```
src/
 ├─ app/                                 # Основные страницы и маршруты Next.js
 │   ├─ _providers/                      # Провайдеры контекстов и общие обертки
 │   ├─ (auth)/                          # Маршруты аутентификации
 │   │   ├─ login/                       # Страница входа
 │   │   ├─ recovery/                    # Восстановление пароля
 │   │   └─ signup/                      # Регистрация
 │   ├─ (protected)/                     # Закрытые маршруты (требуется авторизация)
 │   │   ├─ (dashboard)/                 # Главная страница после входа
 │   │   ├─ myposts/                     # Посты пользователя
 │   │   └─ profile/                     # Профиль пользователя
 │   ├─ api/                             # API маршруты (Next.js API Routes)
 │   │   ├─ auth/                        # Авторизация
 │   │   ├─ posts/                       # Работа с постами
 │   │   │   ├─ all-posts/               # Получение всех постов
 │   │   │   ├─ delete-post/[id]/        # Удаление поста по ID
 │   │   │   ├─ new-post/                # Создание нового поста
 │   │   │   └─ post-user/               # Получение постов конкретного пользователя
 │   │   ├─ register/                    # Регистрация пользователя
 │   │   └─ user/update/                 # Обновление данных пользователя
 │   ├─ globals.css                      # Глобальные стили
 │   ├─ layout.tsx                       # Основной layout
 │   ├─ not-found.tsx                    # Обработка 404
 │   └─ page.tsx                         # Главная страница
 │
 ├─ components/                          # UI и функциональные компоненты
 │   ├─ IU/                              # Элементы интерфейса
 │   ├─ FooterMobile.tsx                 # Мобильный футер
 │   ├─ layoutWrapper.tsx                # Основной layout wrapper
 │   ├─ MyContent.tsx                    # Основной контент
 │   └─ NavDesktop.tsx                   # Навигация для desktop
 │
 ├─ context/                             # Контексты (пользователь, посты, уведомления)
 ├─ lib/                                 # Prisma, NextAuth и вспомогательные функции
 └─ type/                                # Определения типов TypeScript
```
### ✨ Основные возможности

- 🔐 Авторизация и регистрация через NextAuth
- 👤 Управление профилем пользователя и сессией
- 📝 Работа с контентом (создание, удаление)
- 📸 Загрузка аватаров и изображений
- 💬 Уведомления через Ant Design message
- 🧭 Оптимизация рендеринга и SSR

## 🔗 Посмотреть проект

[Открыть проект](https://service-for-publications.onrender.com/)  
_Живой экземпляр приложения, размещённый на Render_
