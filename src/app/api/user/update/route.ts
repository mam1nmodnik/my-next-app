import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

  type Data = {
      id: number;
      name?: string;
      email?: string
      login?: string
      avatar?: string;
  }
const prisma = new PrismaClient();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function PATCH(req: Request) {
  try {
    const data: Data = await req.json();
    if (!data.id) {
      return NextResponse.json({ error: 'ID не передан' }, { status: 400 });
    }
    if(data.email){
      if (!isValidEmail(data.email)) {
        return NextResponse.json({ notice: 'error', message: 'Некорректный email' }, { status: 400 });
      }
    }
    await prisma.user.update({
      where: { id: data.id },
      data: data
    });
    return NextResponse.json({ notice: 'success', message: 'Данные успешно изменены' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return NextResponse.json({ notice: 'error', message: 'Ошибка сервера. Попробуйте позже' }, { status: 500 });
  }
}
