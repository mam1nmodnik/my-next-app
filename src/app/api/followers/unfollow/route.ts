import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/get-session-user-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const followerId = await getSessionUserId();
  if (!followerId) {
    return NextResponse.json(
      { ok: false, message: "Не авторизован" },
      { status: 401 },
    );
  }

  const body = await req.json().catch(() => null);
  const followingId = Number(body?.id);
  if (!Number.isInteger(followingId) || followingId <= 0) {
    return NextResponse.json(
      { ok: false, message: "Некорректный id пользователя" },
      { status: 400 },
    );
  }

  try {
    const deleted = await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({
      ok: true,
      message: deleted.count > 0 ? "Unfollowed successfully" : "Already unfollowed",
    });
  } catch (error) {
    console.error("Unfollow error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to process unfollow request" },
      { status: 500 }
    );
  }
}
