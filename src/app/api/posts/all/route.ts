import { authOptions } from "@/lib/auth-options";
import { apiError, apiSuccess } from "@/shared/api/server";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  try {
    const query = userId ? `?id=${userId}` : "";
    const posts = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/post/get-all${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await posts.json().catch(() => null);

    if (!posts.ok) {
      return apiError(result?.message || "Ошибка при загрузке постов", {
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
