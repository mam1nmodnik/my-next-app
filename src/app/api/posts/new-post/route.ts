import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { idUser, title, content, nameUser, date } = data;

    await prisma.post.create({
      data: {
        idUser,    
        title,     
        content,
        nameUser,
        date
      },
    });
    return NextResponse.json( { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
