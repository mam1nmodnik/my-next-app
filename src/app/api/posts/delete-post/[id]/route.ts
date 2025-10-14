import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// DELETE /api/posts/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: 'Пост успешно удалён' , status: 200 },
    );
  } catch (error) {
    console.error('Ошибка при удалении поста:', error);
    return NextResponse.json(
      { error: 'Не удалось удалить пост' },
      { status: 500 }
    );
  }
}
