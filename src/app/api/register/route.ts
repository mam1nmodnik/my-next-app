"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
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

      return NextResponse.json({ message: "Пользователь успешно создан!", userId: user.id }, { status: 201 });
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const meta = err.meta as PrismaP2002Meta;
        const targetField = meta.target?.[0];
        return NextResponse.json({ error: `${targetField} уже занят` }, { status: 400 });
      }
      throw err;
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера, попробуйте позже" }, { status: 500 });
  }
}
