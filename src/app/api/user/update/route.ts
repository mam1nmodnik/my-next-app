import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/shared/api/server";
import { Prisma } from "@prisma/client";

type Data = {
  name?: string | null;
  email?: string;
  login?: string;
  avatar?: string | null;
  bio?: string | null;
  avatarPublicId?: string | null;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOGIN_REGEX = /^[a-zA-Z0-9_]{3,30}$/;

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return apiError("Не авторизован", { status: 401, notice: "warning" });
  }

  const payload = (await req.json().catch(() => null)) as Data | null;
  if (!payload || typeof payload !== "object") {
    return apiError("Некорректные данные", {
      status: 400,
      notice: "warning",
    });
  }

  const data: Prisma.UserUpdateInput = {};

  if (payload.name !== undefined) {
    if (payload.name !== null && typeof payload.name !== "string") {
      return apiError("Некорректное имя", {
        status: 400,
        notice: "warning",
      });
    }

    const name = payload.name?.trim() ?? null;
    if (name && name.length > 60) {
      return apiError("Имя слишком длинное", {
        status: 400,
        notice: "warning",
      });
    }
    data.name = name || null;
  }

  if (payload.email !== undefined) {
    if (typeof payload.email !== "string") {
      return apiError("Некорректный email", {
        status: 400,
        notice: "warning",
      });
    }

    const email = payload.email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      return apiError("Некорректный email", {
        status: 400,
        notice: "warning",
      });
    }
    data.email = email;
  }

  if (payload.login !== undefined) {
    if (typeof payload.login !== "string") {
      return apiError("Некорректный логин", {
        status: 400,
        notice: "warning",
      });
    }

    const login = payload.login.trim();
    if (!LOGIN_REGEX.test(login)) {
      return apiError("Логин: 3-30 символов, только латиница, цифры и _", {
        status: 400,
        notice: "warning",
      });
    }
    data.login = login;
  }

  if (payload.bio !== undefined) {
    if (payload.bio !== null && typeof payload.bio !== "string") {
      return apiError("Некорректное описание профиля", {
        status: 400,
        notice: "warning",
      });
    }

    const bio = payload.bio?.trim() ?? null;
    if (bio && bio.length > 250) {
      return apiError("Описание слишком длинное", {
        status: 400,
        notice: "warning",
      });
    }
    data.bio = bio;
  }

  if (payload.avatar !== undefined) {
    if (payload.avatar !== null && typeof payload.avatar !== "string") {
      return apiError("Некорректный avatar URL", {
        status: 400,
        notice: "warning",
      });
    }
    data.avatar = payload.avatar;
  }

  if (payload.avatarPublicId !== undefined) {
    if (
      payload.avatarPublicId !== null &&
      typeof payload.avatarPublicId !== "string"
    ) {
      return apiError("Некорректный avatarPublicId", {
        status: 400,
        notice: "warning",
      });
    }
    data.avatarPublicId = payload.avatarPublicId;
  }

  if (Object.keys(data).length === 0) {
    return apiError("Нет данных для обновления", {
      status: 400,
      notice: "warning",
    });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        login: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        date: true,
        avatarPublicId: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return apiSuccess("Данные успешно изменены", user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return apiError("Email или логин уже заняты", { status: 409 });
      }

      if (error.code === "P2025") {
        return apiError("Пользователь не найден", { status: 404 });
      }
    }

    console.error("Ошибка при обновлении данных пользователя:", error);
    return apiError("Ошибка сервера. Попробуйте позже", { status: 500 });
  }
}
