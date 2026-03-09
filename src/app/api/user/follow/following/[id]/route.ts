import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const session = await getServerSession(authOptions);
  const sessionId = session?.user?.id ? Number(session.user.id) : null;

  try {

    const { id } = await context.params;

    const user = await prisma.user.findUnique({
    where: { login: id },
        select: {
            following: {
                select: {
                    following: {
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
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        return NextResponse.json(
            { error: "Users not found" },
            { status: 404 }
        );
    }

    const followers = user.following.map((f) => ({
      id: f.following.id,
      login: f.following.login,
      name: f.following.name,
      avatar: f.following.avatar,
      isFollowedByMe: f.following.followers.length > 0
    }));

    return NextResponse.json(followers);

  } catch {
    return NextResponse.json(
      { error: "Error server" },
      { status: 500 }
    );
  }
}