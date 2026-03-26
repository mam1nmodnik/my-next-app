import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { apiError, apiSuccess } from "@/shared/api/server";
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

  try {
    const deleted = await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    return apiSuccess(
      deleted.count > 0
        ? "Подписка отменена"
        : "Вы уже не подписаны на этого пользователя",
      { followingId, removed: deleted.count > 0 },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unfollow error:", error);
    return apiError("Не удалось отменить подписку", { status: 500 });
  }
}
