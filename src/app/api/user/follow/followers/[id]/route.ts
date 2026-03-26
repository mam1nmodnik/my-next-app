import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id ? Number(session.user.id) : null;

  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { login: id },
      select: {
        followers: {
          select: {
            follower: {
                select: {
                id: true,
                login: true,
                name: true,
                avatar: true,
                followers: {
                  where: {
                    followerId: sessionId || 0,
                  },
                }
              },
            },
          },
        },
      },
    });

    if (!user) {
      return apiError("Пользователь не найден", { status: 404 });
    }

    const followers = user.followers.map((f) => ({
      id: f.follower.id,
      login: f.follower.login,
      name: f.follower.name,
      avatar: f.follower.avatar,
      isFollowedByMe: f.follower.followers.length > 0,
    }));

    return apiSuccess("Подписчики загружены", followers, { notice: "info" });

  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}
