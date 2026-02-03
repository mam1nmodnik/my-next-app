// src/app/api/posts/my/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import {  } from "@prisma/client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const sessioId = Number(session.user.id);

    const userPosts = await prisma.post.findMany({
        where: { userId: sessioId }, 
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
    console.error("Ошибка при получении постов пользователя:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
