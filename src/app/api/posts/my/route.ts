import { authOptions } from "@/lib/auth-options";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { getTokenFromRequest } from "@/shared/config/token";

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return apiError("Не авторизован", { status: 401, notice: "warning" });
    }
  try {
    const posts = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/get-my`, {
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
