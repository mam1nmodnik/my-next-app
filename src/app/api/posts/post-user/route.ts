import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET /api/posts
export async function GET(req: Request) {
  try {
    const userIdHeader = req.headers.get('x-user-id');
    const idUser = userIdHeader || '0';

    if (!idUser) {
      return NextResponse.json({ error: 'Не передан ID пользователя' }, { status: 400 });
    }
    const posts = await prisma.post.findMany({
      where: { idUser },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Ошибка при получении постов пользователя:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
