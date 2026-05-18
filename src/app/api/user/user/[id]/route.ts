import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const sessionId = session?.user?.id
      ? Number(session.user.id)
      : null;

    const { id } = await context.params;
    const userId = Number(id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return apiError("Некорректный id пользователя", {
        status: 400,
        notice: "warning",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
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

    let isFollowedByMe = false;

    if (sessionId) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: sessionId,
            followingId: userId,
          },
        },
      });

      isFollowedByMe = Boolean(follow);
    }

    return apiSuccess(
      "Профиль пользователя загружен",
      {
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        avatarPublicId: user.avatarPublicId,
        _count: {
          followers: user._count.followers,
          following: user._count.following,
        },
        isFollowedByMe,
      },
      { notice: "info" },
    );
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return apiError("Ошибка сервера", { status: 500 });
  }
}
