import { NextRequest } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";

export async function POST(request: NextRequest) {
  const sessionId = await getSessionUserId();
  if (!sessionId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }
  const token = await getTokenFromRequest(request);

  const body = await request.json().catch(() => null);
  const postId = Number(body?.postId);

  if (!Number.isInteger(postId) || postId <= 0) {
    return apiError("Некорректный id поста", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify({ postId }),
    });

    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return apiError(result?.message || "Не удалось изменить лайк", {
        status: res.status,
        notice: res.status === 401 ? "warning" : "error",
      });
    }

    return apiSuccess(
      result.liked ? "Лайк поставлен" : "Лайк убран",
      result,
    );
  } catch (error) {
    console.error("Ошибка при изменении лайка:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
