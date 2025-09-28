# Базовый образ с Node 20 (рекомендуется для Next.js 14+)
FROM node:20-alpine AS base
WORKDIR /app

# Установка зависимостей
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
# Используем pnpm, если есть lock-файл, иначе npm
RUN npm install

# Копируем весь проект
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Сборка проекта с Turbopack
RUN npm run build

# Продакшн-образ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем сборку и зависимости
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Экспонируем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
