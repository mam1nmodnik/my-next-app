import { NextResponse, NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
export async function GET(req: NextRequest,context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; 
    const postId = Number(id);
    try {
    const comments = await prisma.chat.findMany({
        where: {
            postId,
            parentId: null 
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
            select: {
                id: true,
                login: true,
                avatar: true
            }
            },
            likes: {
            select: { userId: true }
            },
            replies: {
            orderBy: {
                createdAt: "asc"
            },
            include: {
                user: {
                select: {
                    id: true,
                    login: true,
                    avatar: true
                }
                },
                likes: {
                select: { userId: true }
                }
            }
            }
        }
        })

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Ошибка при получении пользоватея:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}

