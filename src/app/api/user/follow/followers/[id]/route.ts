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

    const followers = user.followers.map((f) => ({
        id: f.follower.id,
        login: f.follower.login,
        name: f.follower.name,
        avatar: f.follower.avatar,
        isFollowedByMe: f.follower.followers.length > 0
    }));

    return NextResponse.json(followers);

    } catch {
    return NextResponse.json(
        { error: "Error server" },
        { status: 500 }
    );
    } 
}