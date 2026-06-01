import { authOptions } from "@/lib/auth-options";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
 

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  } 
  const token = await getTokenFromRequest(request);

  try {
 
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/user/this-user`,{
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

    if (!data?.user) {
      return apiError("Пользователь не найден", { status: 404 });
    }

    return apiSuccess("Профиль загружен", data.user, { notice: "info" });
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
