import { authOptions } from '@/lib/auth-options';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
      const session = await getServerSession(authOptions)
      const userId = session?.user?.id
  try {
    const {  content } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json({ notice: 'error', message: 'Пользователь не найден' }, { status: 404 });
    }

    await prisma.post.create({
      data: {
        content,
        user: { connect: { id: Number(userId) } },
      },
    });

    return NextResponse.json({ notice: 'success', message: 'Пост успешно создан' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    return NextResponse.json({ message: 'Ошибка сервера' , notice: "error"}, { status: 500});
  }
}
