import { NextRequest } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const { id } = await context.params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId <= 0) {
    return apiError("Некорректный id поста", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      return apiError("Пост не найден", { status: 404 });
    }

    if (post.userId !== userId) {
      return apiError("Нет прав на удаление этого поста", { status: 403 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return apiSuccess("Пост успешно удален", { id: postId });
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    return apiError("Не удалось удалить пост", { status: 500 });
  }
}
