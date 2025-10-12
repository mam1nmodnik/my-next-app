import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // Расширяем тип пользователя
  interface User extends DefaultUser {
    id: string;
    login: string;
  }

  // Расширяем тип сессии
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      login: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    login: string;
  }
}
