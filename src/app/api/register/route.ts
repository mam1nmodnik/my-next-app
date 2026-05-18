"use server";

import { apiError, apiSuccess } from "@/shared/api/server";
import { Prisma } from "@prisma/client";
import { NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";

interface PrismaP2002Meta {
  target?: string[];
}

export async function POST(req: Request) {
  try {
    const { email, login, password, } = await req.json();

    try {
      const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          login,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return apiError(errorData?.message || "Ошибка регистрации", {
          status: res.status,
          notice: "warning",
        });
      }

      return apiSuccess(
        "Пользователь успешно создан",
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
