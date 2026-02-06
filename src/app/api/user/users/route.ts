import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const sessionId = session?.user?.id ? Number(session.user.id) : null;

    const users = await prisma.user.findMany({
      take: 5,
      orderBy: {
        followers: { _count: 'desc' }, 
      },
      select: {
        id: true,
        login: true,
        avatar: true,
        name: true,
        bio: true,
        avatarPublicId: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        followers: {
          where: {
            followerId: sessionId || 0,
          },
          select: {
            id: true,
          },
        },
      },
    });

   const result = users.map((user) => ({
      id: user.id,
      login: user.login,
      name: user.name,
      avatar: user.avatar,
      avatarPublicId: user.avatarPublicId,
      bio: user.bio,
      followersCount: user._count.followers,
      followingCount: user._count.following,
      isFollowedByMe: user.followers.length > 0,
    }));

    return NextResponse.json(result);

  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
