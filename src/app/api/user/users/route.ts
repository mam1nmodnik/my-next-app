import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {

    try {
    const user = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            login: true,
            avatar: true,
        }
    });

    return NextResponse.json(user);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
