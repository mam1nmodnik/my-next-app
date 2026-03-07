import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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

  if (followingId === followerId) {
    return NextResponse.json(
      { ok: false, message: "Нельзя подписаться на самого себя" },
      { status: 400 },
    );
  }

  try {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ ok: true, message: "Followed successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ ok: true, message: "Already followed" });
      }

      if (error.code === "P2003") {
        return NextResponse.json(
          { ok: false, message: "Пользователь не найден" },
          { status: 404 },
        );
      }
    }

    console.error("Follow error:", error);
    return NextResponse.json(
      { message: "Failed to process follow request", ok: false },
      { status: 500 },
    );
  }
}
