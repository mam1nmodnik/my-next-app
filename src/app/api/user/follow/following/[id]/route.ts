import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const token = await getTokenFromRequest(request);

  try {
    const { id } = await context.params;
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return apiError("Некорректный ID пользователя", { status: 400 });
    }
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token?.accessToken) {
      headers.Authorization = `Bearer ${token.accessToken}`;
    }

    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/user/following?id=${idNumber}`,{
      method: "GET",
      headers,
    })
    
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return apiError(data?.message || "Ошибка при получении данных пользователя", {
        status: res.status,
        notice: "warning",
      });
    }

    if (!data?.following) {
      return apiError("Пользователь не найден", { status: 404 });
    }

    return apiSuccess("Подписки загружены", data.following, { notice: "info" });

  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}
