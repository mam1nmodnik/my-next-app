import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

  type Data = {
  
      id: number;
      name?: string;
      email?: string
      login?: string
    
  }


const prisma = new PrismaClient();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function PATCH(req: Request) {
  try {
    const { id, name, email, login }: Data = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'ID не передан' }, { status: 400 });
    }
    if(email){
      if (!isValidEmail(email)) {
        return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
      }
    }
    await prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        login
      }
    });
    return NextResponse.json(
      { message: 'Данные успешно изменены', status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
