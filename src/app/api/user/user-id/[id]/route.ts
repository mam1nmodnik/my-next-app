import { authOptions } from "@/lib/auth-options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
 
  try {
    const session = await getServerSession(authOptions);
    const sessionId = session?.user?.id
      ? Number(session.user.id)
      : null;

    const userId = Number(params.id);

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user id" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
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

    return NextResponse.json({
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      avatarPublicId: user.avatarPublicId,

      followersCount: user._count.followers,
      followingCount: user._count.following,

      isFollowedByMe,
    });
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
