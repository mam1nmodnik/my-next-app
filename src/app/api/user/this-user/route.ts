import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';


export async function GET() {

    const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }
    
    const userId = Number(session.user.id);

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
