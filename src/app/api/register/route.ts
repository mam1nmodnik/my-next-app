"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";


interface PrismaP2002Meta {
  target?: string[];
}
// Функция для валидации email
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Функция для валидации пароля
function isValidPassword(password: string) {
  return password.length >= 6;
}

export async function POST(req: Request) {
  try {
    const { email, login, password, name, avatar } = await req.json();

    // Проверка обязательных полей
    if (!email || !login || !password) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    // Валидация email
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }

    // Валидация пароля
    if (!isValidPassword(password)) {
      return NextResponse.json({ error: "Пароль должен быть не менее 6 символов" }, { status: 400 });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя с обработкой ошибок уникальности
    try {
      const user = await prisma.user.create({
        data: {
          email,
          login,
          password: hashedPassword,
          name: name ?? null,
          avatar: avatar ?? null,
        },
      });

      return NextResponse.json({ message: "Пользователь успешно создан!", userId: user.id }, { status: 201 });
    } catch (err) {
      // Обработка ошибок уникальности (email или login уже заняты)
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const meta = err.meta as PrismaP2002Meta;
        const targetField = meta.target?.[0];
        return NextResponse.json({ error: `${targetField} уже занят` }, { status: 400 });
      }

      throw err;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера, попробуйте позже" }, { status: 500 });
  }
}
