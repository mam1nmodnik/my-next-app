import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const followerId = await getSessionUserId();
  if (!followerId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const body = await req.json().catch(() => null);
  const followingId = Number(body?.id);
  if (!Number.isInteger(followingId) || followingId <= 0) {
    return apiError("Некорректный id пользователя", {
      status: 400,
      notice: "warning",
    });
  }

  if (followingId === followerId) {
    return apiError("Нельзя подписаться на самого себя", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return apiSuccess(
      "Подписка оформлена",
      { followingId },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return apiSuccess("Вы уже подписаны на этого пользователя", {
          followingId,
        });
      }

      if (error.code === "P2003") {
        return apiError("Пользователь не найден", { status: 404 });
      }
    }

    console.error("Follow error:", error);
    return apiError("Не удалось выполнить подписку", { status: 500 });
  }
}
