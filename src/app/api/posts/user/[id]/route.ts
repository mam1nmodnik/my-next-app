import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id ? Number(session.user.id) : null;
  const { id } = await context.params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return apiError("Некорректный id пользователя", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, login: true, name: true, avatar: true },
        },
        likes: {
          where: {
            userId: sessionId ?? 0,
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
  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}
