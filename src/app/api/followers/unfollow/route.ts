import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type UnfollowRequestBody = {
  followingId: number;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const followerId = session?.user?.id
      ? Number(session.user.id)
      : null;

    const { id } = await req.json()
   
    await prisma.follow.deleteMany({
      where: {
        followerId: Number(followerId),
        followingId: Number(id),
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Unfollowed successfully",
    });
  } catch (error) {
    console.error("Unfollow error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to process unfollow request" },
      { status: 500 }
    );
  }
}
