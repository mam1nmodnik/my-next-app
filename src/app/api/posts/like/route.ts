import { authOptions } from "@/lib/auth-options"
import { PrismaClient, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const {  postId } = await req.json()
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id || null
  try {
    const result = await prisma.$transaction(async (tx) => {
      try {
        await tx.like.create({
          data: {
            userId: Number(userId),
            postId: Number(postId),
          },
        })

        const post = await tx.post.update({
          where: { id: Number(postId) },
          data: {
            likesCount: { increment: 1 },
          },
        })

        return { post, liked: true }

      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          await tx.like.delete({
            where: {
              userId_postId: {
                userId: Number(userId),
                postId: Number(postId),
              },
            },
          })

          const post = await tx.post.update({
            where: { id: Number(postId) },
            data: {
              likesCount: { decrement: 1 },
            },
          })

          return { ...post, liked: false }
        }

        throw e
      }
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error("TOGGLE LIKE ERROR:", error)
    return NextResponse.json(
      { statusText: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
