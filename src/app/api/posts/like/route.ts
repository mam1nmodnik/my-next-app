import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const body = await req.json().catch(() => null);
  const postId = Number(body?.postId);

  if (!Number.isInteger(postId) || postId <= 0) {
    return apiError("Некорректный id поста", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const existing = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      if (existing) {
        await prisma.like.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        });

        const post = await prisma.post.update({
          where: { id: postId },
          data: {
            likesCount: { decrement: 1 },
          },
        });

        return { post, liked: false };
      }

      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          likesCount: { increment: 1 },
        },
      });

      return { post, liked: true };
    });

    return apiSuccess(
      result.liked ? "Лайк поставлен" : "Лайк убран",
      result,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2003" || error.code === "P2025")
    ) {
      return apiError("Пост не найден", { status: 404 });
    }

    console.error("TOGGLE LIKE ERROR:", error);

    return apiError("Ошибка сервера", { status: 500 });
  }
}
