import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions)
    const sessioId = session?.user?.id || null

    const { id } = await req.json()
    
    try {
    await prisma.follow.create({
        data: {
            followerId: Number(sessioId),
            followingId: Number(id),
        }
    });

    return NextResponse.json({ ok: true, message: "Followed successfully"});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to process follow request", ok: false });
    } 
}
