"use server";

import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

interface PrismaP2002Meta {
  target?: string[];
}

export async function POST(req: Request) {
  try {
    const { email, login, password, name, avatar } = await req.json();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          login,
          password: hashedPassword,
          name: name ?? null,
          avatar: avatar ?? null,
        },
      });

      return apiSuccess(
        "Пользователь успешно создан",
        { userId: user.id },
        { status: 201 },
      );
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const meta = err.meta as PrismaP2002Meta;
        const targetField = meta.target?.[0];
        return apiError(`${targetField} уже занят`, {
          status: 400,
          notice: "warning",
        });
      }
      throw err;
    }
  } catch (e) {
    console.error(e);
    return apiError("Ошибка сервера, попробуйте позже", { status: 500 });
  }
}
