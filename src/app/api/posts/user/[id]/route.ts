import { apiError, apiSuccess } from "@/shared/api/server";
import { getTokenFromRequest } from "@/shared/config/token";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = await getTokenFromRequest(request);

  const { id } = await context.params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return apiError("Некорректный id пользователя", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/get-user-twits?id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );

    const result = await posts.json();

    if (!posts.ok) {
      return apiError(result?.message, {
        status: posts.status,
        notice: "warning",
      });
    }

    return apiSuccess("Посты загружены", result ?? [], {
      notice: "info",
    });
  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}