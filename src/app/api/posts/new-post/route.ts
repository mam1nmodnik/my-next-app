// src/app/api/posts/new-post/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id, title, content, date } = await req.json();

    if (!id || !title || !content || !date) {
      return NextResponse.json({ notice: 'error', message: 'Все поля обязательны' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ notice: 'error', message: 'Пользователь не найден' }, { status: 404 });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        date: new Date(date),
        user: { connect: { id: Number(id) } },
      },
    });

    return NextResponse.json({ notice: 'success', message: 'Пост успешно создан' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    return NextResponse.json({ message: 'Ошибка сервера' , notice: 'error'}, { status: 500});
  }
}
