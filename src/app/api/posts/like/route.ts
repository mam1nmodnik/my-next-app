import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const postId = Number(body?.postId);

  if (!Number.isInteger(postId) || postId <= 0) {
    return NextResponse.json(
      { message: "Некорректный id поста" },
      { status: 400 }
    );
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

    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2003" || error.code === "P2025")
    ) {
      return NextResponse.json({ message: "Пост не найден" }, { status: 404 });
    }

    console.error("TOGGLE LIKE ERROR:", error);

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
