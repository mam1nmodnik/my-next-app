import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id || null

  const posts = await prisma.post.findMany({
  orderBy: { createdAt: "desc" },
  include: {
    user: {
      select: { id: true, login: true, name: true },
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
}