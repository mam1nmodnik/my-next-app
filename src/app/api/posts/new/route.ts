import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json(
      { notice: "error", message: "Не авторизован" },
      { status: 401 },
    );
  }

  const body = await req.json().catch(() => null);
  const rawContent = body?.content;
  if (typeof rawContent !== "string") {
    return NextResponse.json(
      { notice: "error", message: "Некорректный формат поста" },
      { status: 400 },
    );
  }

  const content = rawContent.trim();
  if (content.length === 0 || content.length > 250) {
    return NextResponse.json(
      {
        notice: "error",
        message: "Текст поста должен быть от 1 до 250 символов",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.post.create({
      data: {
        content,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(
      { notice: "success", message: "Пост успешно создан" },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        { notice: "error", message: "Пользователь не найден" },
        { status: 404 },
      );
    }

    console.error("Ошибка при создании поста:", error);
    return NextResponse.json(
      { message: "Ошибка сервера", notice: "error" },
      { status: 500 },
    );
  }
}
