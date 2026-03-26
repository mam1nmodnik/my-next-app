import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

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
    });

    const result = posts.map((post) => ({
      ...post,
      likesCount: post.likesCount,
      isLiked: post.likes.length > 0,
    }));

    return apiSuccess("Посты загружены", result, { notice: "info" });
  } catch {
    return apiError("Ошибка сервера", { status: 500 });
  }
}
