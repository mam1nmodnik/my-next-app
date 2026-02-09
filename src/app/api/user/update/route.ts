import { authOptions } from '@/lib/auth-options';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

  type Data = {
      name?: string;
      email?: string
      login?: string
      avatar?: string;
      bio?: string,
      avatarPublicId?: string;
  }
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  try {



    const data: Data = await req.json();

    

    await prisma.user.update({
      where: { id: Number(userId)},
      data: data
    });
    return NextResponse.json({ notice: 'success', message: 'Данные успешно изменены' });
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return NextResponse.json({ notice: 'error', message: 'Ошибка сервера. Попробуйте позже' });
  }
}
