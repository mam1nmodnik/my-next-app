import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {

  const { id } = await context.params; 
  const userId = Number(id);

    try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        name: true,
        email: true,
        avatar: true,
        bio: true
      }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при получении пользоватея:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
