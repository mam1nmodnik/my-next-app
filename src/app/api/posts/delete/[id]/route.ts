import { NextRequest } from "next/server";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const token = await getTokenFromRequest(request);
  const sessionId = await getSessionUserId();
  if (!sessionId) {
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
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify({ postId }),
    });
    const result = await res.json().catch(() => null);

    if (!res.ok) {
      return apiError(result?.message || "Не удалось удалить пост", {
        status: res.status,
        notice: res.status === 401 ? "warning" : "error",
      });
    }

    return apiSuccess("Пост успешно удален");
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    return apiError("Не удалось удалить пост", { status: 500 });
  }
}
