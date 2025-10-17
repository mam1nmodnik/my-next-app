// src/app/api/posts/new-post/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, title, content, date } = await req.json();

    // Проверка обязательных полей
    if (!id || !title || !content || !date) {
      return NextResponse.json(
        { error: `Все поля обязательны: ${id}, ${title}, ${content}, ${date}` },
        { status: 400 }
      );
    }

    // Проверяем существование пользователя
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    // Создание поста
    const post = await prisma.post.create({
      data: {
        title,
        content,
        date: new Date(date),
        user: { connect: { id: Number(id) } },
      },
    });

    return NextResponse.json({ status: 200, message: 'Пост успешно создан', post });
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
