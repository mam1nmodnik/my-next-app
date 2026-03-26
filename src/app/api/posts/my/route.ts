// src/app/api/posts/my/route.ts
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return apiError("Не авторизован", { status: 401, notice: "warning" });
    }

    const sessioId = Number(session.user.id);

    const posts = await prisma.post.findMany({
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

    const result = posts.map((post) => ({
      ...post,
      likesCount: post.likesCount,
      isLiked: post.likes.length > 0,
    }));

    return apiSuccess("Посты пользователя загружены", result, {
      notice: "info",
    });
  } catch (error) {
    console.error("Ошибка при получении постов пользователя:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
