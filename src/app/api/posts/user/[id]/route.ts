import { authOptions } from '@/lib/auth-options';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {

  const session = await getServerSession(authOptions)
  const sessioId = session?.user?.id || null

  const { id } = await context.params; 
  const userId = Number(id);
  
    try {
    const userPosts = await prisma.post.findMany({
      where: { userId: userId }, 
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, login: true, name: true, avatar: true },
        },
        likes: {
          where: {
            userId: Number(sessioId), 
            isLiked: true,  
          },
          select: {
            id: true, 
          },
        },
      },
    });
      const result = userPosts.map(post => {
        return {
          ...post,
          likesCount: post.likesCount,
          isLiked: post.likes.length > 0,
        }
      });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Ошибка при получении пользоватея:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
