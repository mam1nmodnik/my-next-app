import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options"


export async function GET() {


  const session = await getServerSession(authOptions)
  const userId = session?.user?.id || null
    try {
      const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { id: true, login: true, name: true, avatar: true },
            },
            likes: {
              where: {
                userId: Number(userId), 
                isLiked: true,  
              },
              select: {
                id: true, 
              },
            },
          },
      })


      const result = posts.map(post => {
        return {
          ...post,
          likesCount: post.likesCount,
          isLiked: post.likes.length > 0,
        }
      })


      return NextResponse.json(result)
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
      return NextResponse.json({ error: `Ошибка сервера: ${error}` }, { status: 500 });
    }
}