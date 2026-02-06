import { authOptions } from '@/lib/auth-options';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || null

    try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        login: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        date: true,
        avatarPublicId: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при получении пользоватея:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
