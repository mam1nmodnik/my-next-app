import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
      user: {
        select: {
          name: true,
        },
      } 
    }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Ошибка при получении постов:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
