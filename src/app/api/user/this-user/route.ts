import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth/next";
 

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }
  const userId = Number(session.user.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        date: true,
        avatarPublicId: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return apiError("Пользователь не найден", { status: 404 });
    }

    return apiSuccess("Профиль загружен", user, { notice: "info" });
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
