import { getSessionUserId } from "@/lib/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
      { notice: "error", message: "Не авторизован" },
      { status: 401 },
    );
  }

  const payload = (await req.json().catch(() => null)) as Data | null;
  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { notice: "error", message: "Некорректные данные" },
      { status: 400 },
    );
  }

  const data: Prisma.UserUpdateInput = {};

  if (payload.name !== undefined) {
    if (payload.name !== null && typeof payload.name !== "string") {
      return NextResponse.json(
        { notice: "error", message: "Некорректное имя" },
        { status: 400 },
      );
    }

    const name = payload.name?.trim() ?? null;
    if (name && name.length > 60) {
      return NextResponse.json(
        { notice: "error", message: "Имя слишком длинное" },
        { status: 400 },
      );
    }
    data.name = name || null;
  }

  if (payload.email !== undefined) {
    if (typeof payload.email !== "string") {
      return NextResponse.json(
        { notice: "error", message: "Некорректный email" },
        { status: 400 },
      );
    }

    const email = payload.email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { notice: "error", message: "Некорректный email" },
        { status: 400 },
      );
    }
    data.email = email;
  }

  if (payload.login !== undefined) {
    if (typeof payload.login !== "string") {
      return NextResponse.json(
        { notice: "error", message: "Некорректный логин" },
        { status: 400 },
      );
    }

    const login = payload.login.trim();
    if (!LOGIN_REGEX.test(login)) {
      return NextResponse.json(
        {
          notice: "error",
          message: "Логин: 3-30 символов, только латиница, цифры и _",
        },
        { status: 400 },
      );
    }
    data.login = login;
  }

  if (payload.bio !== undefined) {
    if (payload.bio !== null && typeof payload.bio !== "string") {
      return NextResponse.json(
        { notice: "error", message: "Некорректное описание профиля" },
        { status: 400 },
      );
    }

    const bio = payload.bio?.trim() ?? null;
    if (bio && bio.length > 250) {
      return NextResponse.json(
        { notice: "error", message: "Описание слишком длинное" },
        { status: 400 },
      );
    }
    data.bio = bio;
  }

  if (payload.avatar !== undefined) {
    if (payload.avatar !== null && typeof payload.avatar !== "string") {
      return NextResponse.json(
        { notice: "error", message: "Некорректный avatar URL" },
        { status: 400 },
      );
    }
    data.avatar = payload.avatar;
  }

  if (payload.avatarPublicId !== undefined) {
    if (
      payload.avatarPublicId !== null &&
      typeof payload.avatarPublicId !== "string"
    ) {
      return NextResponse.json(
        { notice: "error", message: "Некорректный avatarPublicId" },
        { status: 400 },
      );
    }
    data.avatarPublicId = payload.avatarPublicId;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { notice: "error", message: "Нет данных для обновления" },
      { status: 400 },
    );
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    return NextResponse.json(
      { notice: "success", message: "Данные успешно изменены" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { notice: "error", message: "Email или логин уже заняты" },
          { status: 409 },
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          { notice: "error", message: "Пользователь не найден" },
          { status: 404 },
        );
      }
    }

    console.error("Ошибка при обновлении данных пользователя:", error);
    return NextResponse.json(
      { notice: "error", message: "Ошибка сервера. Попробуйте позже" },
      { status: 500 },
    );
  }
}
