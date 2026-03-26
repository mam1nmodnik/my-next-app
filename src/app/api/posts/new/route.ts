import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { Prisma } from "@prisma/client";
import { apiError, apiSuccess } from "@/shared/api/server";

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const body = await req.json().catch(() => null);
  const rawContent = body?.content;
  if (typeof rawContent !== "string") {
    return apiError("Некорректный формат поста", {
      status: 400,
      notice: "warning",
    });
  }

  const content = rawContent.trim();
  if (content.length === 0 || content.length > 250) {
    return apiError("Текст поста должен быть от 1 до 250 символов", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        user: { connect: { id: userId } },
      },
    });

    return apiSuccess("Пост успешно создан", post);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return apiError("Пользователь не найден", { status: 404 });
    }

    return apiError("Ошибка сервера", { status: 500 });
  }
}
