"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import MyInput from "@/components/IU/MyInput";
import { MyButton } from "@/components/IU/MyButton";
type ErrorInput = {
  allError?: string | null;
  email?: { title?: string };
  password?: { title?: string };
};

export default function LogIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<ErrorInput>({});
  const [loadbtn, setLoadBtn] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let emailValid = true;
    let passwordValid = true;

    setError({
      allError: null,
      email: { title: undefined },
      password: { title: undefined },
    });

    if (!form.email || !form.password) {
      setError((prev) => ({
        ...prev,
        allError: "Заполните все поля",
      }));
    }

    if (!isValidEmail(form.email)) {
      emailValid = false;
      setError((prev) => ({
        ...prev,
        email: { title: "Email заполнен некорректно!" },
      }));
    }

    if (!isValidPassword(form.password)) {
      passwordValid = false;
      setError((prev) => ({
        ...prev,
        password: { title: "Длина пароля должна быть больше 6" },
      }));
    }

    if (!emailValid || !passwordValid) return;

    try {
      setLoadBtn(() => true);
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        setLoadBtn(() => false);
        setError((prev) => ({
          ...prev,
          allError: res.error,
        }));
        return;
      }
      window.location.href = "/";
      setLoadBtn(() => false);
    } catch (err) {
      console.log(err);
      setLoadBtn(() => false);
    }
  };

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password: string) {
    return password.length >= 6;
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-[25rem] pt-10 pr-10 pl-10 pb-5 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h1 className="text-white text-xl">Log In</h1>
          <div className="flex flex-col gap-4 w-full">
            <MyInput
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <MyInput
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              togglePassword={true}
            />
          </div>

          <div className="flex flex-col gap-5 relative">
            <div className="flex items-center justify-between pr-3 pl-3">
              <label htmlFor="" className="flex gap-2 text-white">
                <input type="checkbox" className="w-4" />
                Remember me
              </label>
              <p className="text-white gap-2 flex ">
                <Link href="/recovery" scroll={false}>
                  Forgot password
                </Link>
              </p>
            </div>

            <MyButton loading={loadbtn}>Log In</MyButton>

            <div className="relative">
              {(error.allError ||
                error.email?.title ||
                error.password?.title) && (
                <div className="flex flex-col">
                  <p className="text-red-500 text-center ">{error.allError}</p>
                  <p className="text-red-500 text-center ">
                    {error.email?.title}
                  </p>
                  <p className="text-red-500 text-center ">
                    {error.password?.title}
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-white text-center flex flex-col ">
            Нет аккаунта?
            <Link href="/signup" scroll={false}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
