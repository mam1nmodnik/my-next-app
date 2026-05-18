import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    return apiError("Некорректный id поста", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const comments = await prisma.chat.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            avatar: true,
          },
        },
        likes: {
          select: { userId: true },
        },
        replies: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            user: {
              select: {
                id: true,
                login: true,
                avatar: true,
              },
            },
            likes: {
                select: { userId: true }
            },
          },
        },
      },
    });

    return apiSuccess("Комментарии загружены", comments, {
      notice: "info",
    });
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
