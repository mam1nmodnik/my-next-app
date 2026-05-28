import { getSessionUserId } from "@/lib/get-session-user-id";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getTokenFromRequest } from "@/shared/config/token";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }
  const token = await getTokenFromRequest(request);

  const body = await request.json().catch(() => null);
  const rawContent = body?.content;
  if (typeof rawContent !== "string") {
    return apiError("Некорректный формат поста", {
      status: 400,
      notice: "warning",
    });
  }

  const content = rawContent.trim();
  
  if (content.length === 0 || content.length > 258) {
    return apiError("Максимальное количество символов не более 258", {
      status: 400,
      notice: "warning",
    });
  }

  try {
 
    const create = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.accessToken}`,
          },
          body: JSON.stringify({ userId, content }),
        });
    
        const result = await create.json().catch(() => null);
    
        if (!create.ok) {
          return apiError(result?.message || "Ошибка при загрузке постов", {
            status: create.status,
            notice: "warning",
          });
        }
    

    return apiSuccess("Пост успешно создан");
  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  } 
}
