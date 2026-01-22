import { PrismaClient, Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { userId, postId } = await req.json()

  if (!userId || !postId) {
    return NextResponse.json(
      { message: "userId и postId обязательны" },
      { status: 400 }
    )
  }

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

          return { post, liked: false }
        }

        throw e
      }
    })

    return NextResponse.json({ success: true, ...result })

  } catch (error) {
    console.error("TOGGLE LIKE ERROR:", error)
    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
