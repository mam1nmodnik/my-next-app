import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {  NEXT_PUBLIC_DATABASE_URL_DEV } from "@/shared/config/env";


export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Пароль", type: "password" },
      },

      async authorize(credentials) {

        console.log("Login response status:", credentials);

        if (!credentials?.email || !credentials?.password) throw new Error('Все поля обязательны');

        try{
          const res = await fetch(`${NEXT_PUBLIC_DATABASE_URL_DEV}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (!res.ok) throw new Error('Ошибка при авторизации');
          console.log("Login response status:", res.status);

          const data = await res.json().catch(() => null);
            if (!data?.user?.id) throw new Error('id пользователя не найден в ответе');

          return {
            id: data?.user?.id,
            email: data.user?.email,
            login: data?.user?.login,
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
          };
        } catch (error) {
          console.error("Login error", error);
          throw new Error('Ошибка при авторизации');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, 
  },
  callbacks: {
  async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = String(user.email);
        token.login = user.login;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
  async session({ session, token }) {
      
          if (token?.id) {
        

          session.user = {
            id: String(token.id),
            email: token.email,
            login: token.login,
          };
        
      }
      return session;
      
    },
  },
};
