import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const userId = Number(id);

  const token = await getTokenFromRequest(request);
  

  if (!Number.isInteger(userId) || userId <= 0) {
    return apiError("Некорректный id пользователя", {
      status: 400,
      notice: "warning",
    });
  }

    try {
      const posts = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/get-user-twits?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },  
      });
  
      const result = await posts.json().catch(() => null);
  
      if (!posts.ok) {
        return apiError(result?.message , {
          status: posts.status,
          notice: "warning",
        });
      }
  
      const postsData = Array.isArray(result) ? result : [];
      return apiSuccess("Посты загружены", postsData, { notice: "info" });
  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}
