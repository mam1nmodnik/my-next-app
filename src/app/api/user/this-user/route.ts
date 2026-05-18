import { authOptions } from "@/lib/auth-options";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getServerSession } from "next-auth/next";
import { NextAuthTokenWithAccess } from "../../logout/route";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
 

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }
  const userId = Number(session.user.id);

  try {
     const token = (await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
        })) as NextAuthTokenWithAccess | null;
    
    const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/auth/this-user?id=${userId}`,{
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
