import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
){
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

    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/user/user?id=${userId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
    });

    const data = await res.json()

    if (!res.ok) {
      return apiError(data?.message || "Ошибка при получении данных пользователя", {
        status: res.status,
        notice: "warning",
      });
    }
    
    if (!data.user) {
      return apiError("Пользователь не найден", { status: 404 });
    }
    return apiSuccess("Профиль загружен", data.user, { notice: "info" });

  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
