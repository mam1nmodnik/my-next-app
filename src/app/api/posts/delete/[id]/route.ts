import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json(
      { notice: "error", message: "Не авторизован" },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId <= 0) {
    return NextResponse.json(
      { notice: "error", message: "Некорректный id поста" },
      { status: 400 },
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      return NextResponse.json(
        { notice: "error", message: "Пост не найден" },
        { status: 404 },
      );
    }

    if (post.userId !== userId) {
      return NextResponse.json(
        { notice: "error", message: "Нет прав на удаление этого поста" },
        { status: 403 },
      );
    }

    await prisma.post.delete({
      where: { id: postId },
    });
    return NextResponse.json(
      { notice: "success", message: "Пост успешно удален" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    return NextResponse.json(
      { notice: "error", message: "Не удалось удалить пост" },
      { status: 500 },
    );
  }
}
