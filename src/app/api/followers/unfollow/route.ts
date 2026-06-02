import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NextRequest } from "next/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";

export async function POST(request: NextRequest) {
  const token = await getTokenFromRequest(request);
  
  const followerId = await getSessionUserId();
  if (!followerId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const body = await request.json().catch(() => null);
  const followingId = Number(body?.id);
  if (!Number.isInteger(followingId) || followingId <= 0) {
    return apiError("Некорректный id пользователя", {
      status: 400,
      notice: "warning",
    });
  }

  try {
            const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/user/unfollow`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.accessToken}`,
              },
                        body: JSON.stringify({ id: followingId }),

            });
        const result = await res.json().catch(() => null);
    
        if (!res.ok) {
          return apiError(result?.message , {
            status: res.status,
            notice: "warning",
          });
        }
    
        return apiSuccess(
          "Подписка отменена",
          { followingId },
          { status: 200 },
        );
  } catch (error) {
    console.error("Unfollow error:", error);
    return apiError("Не удалось отменить подписку", { status: 500 });
  }
}
