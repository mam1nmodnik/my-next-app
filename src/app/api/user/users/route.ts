import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { NextRequest } from "next/server";
import { getTokenFromRequest } from "@/shared/config/token";
 

export async function GET(request: NextRequest) {
  const token = await getTokenFromRequest(request);

  try {
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/user/recommended`,{
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
    })
    
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return apiError(data?.message || "Ошибка при получении данных пользователя", {
        status: res.status,
        notice: "warning",
      });
    }

    if (!data?.users) {
      return apiError("Пользователи не найдены", { status: 404 });
    }

    return apiSuccess("Пользователи загружены", data.users, { notice: "info" });
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
