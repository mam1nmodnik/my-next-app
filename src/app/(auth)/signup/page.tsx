"use client";
import { MyButton } from "@/components/IU/MyButton";
import MyInput from "@/components/IU/MyInput";
import Link from "next/link";
import { useState } from "react";

type ErrorInput = {
  allError?: string | null;
  email?: { title?: string };
  password?: { title?: string }[];
};

export default function SignUp() {
  const [form, setForm] = useState({ login: "", email: "", password: "" });

  const [error, setError] = useState<ErrorInput>({});
  const [loadbtn, setLoadBtn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let loginValid = true;
    let emailValid = true;
    let passwordValid = true;

    setError({
      allError: null,
      email: { title: undefined },
      password: [],
    });

    if (!form.email || !form.password || !form.login) {
      loginValid = false;
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

    const errors = validatePasswordStepByStep(form.password);

    if (errors.length > 0) {
      passwordValid = false;
      setError((prev) => ({
        ...prev,
        password: errors,
      }));
    }

    if (!emailValid || !passwordValid || !loginValid) return;

    try {
      setLoadBtn(() => true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data?.error) {
        setError((prev) => ({
          ...prev,
          allError: data.error,
        }));
        return;
      }

      window.location.href = "/login";
      setLoadBtn(() => false);
    } catch (err) {
      console.log(err);
    }
  };

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePasswordStepByStep(password: string) {
    const errors = [];

    const hasLowercase = /[a-z]/; // хотя бы одна строчная буква
    const hasUppercase = /[A-Z]/; // хотя бы одна заглавная буква
    const hasNumber = /\d/; // хотя бы одна цифра
    const hasSpecial = /[!@#$%^&*]/; // хотя бы один спецсимвол
    const isValidLength = /^.{8,20}$/; // длина от 8 до 20 символов

    if (!hasLowercase.test(password))
      errors.push({ title: "Добавьте хотя бы одну строчную букву" });
    if (!hasUppercase.test(password))
      errors.push({ title: "Добавьте хотя бы одну заглавную букву" });
    if (!hasNumber.test(password))
      errors.push({ title: "Добавьте хотя бы одну цифру" });
    if (!hasSpecial.test(password))
      errors.push({ title: "Добавьте хотя бы один спецсимвол (!@#$%^&*)" });
    if (!isValidLength.test(password))
      errors.push({ title: "Длина пароля должна быть от 8 до 20 символов" });

    return errors;
  }
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-[25rem] pt-10 pr-10 pl-10 pb-5 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h1 className="text-white text-xl">Sign Up</h1>
          <div className="flex flex-col gap-4 w-full">
            <MyInput
              type="text"
              name="login"
              placeholder="login"
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
            />
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
            <label htmlFor="" className="flex gap-2 text-white pl-4">
              <input type="checkbox" name="" id="" className="w-4" />I Agree
              with privacy and policy
            </label>

            <MyButton loading={loadbtn}>Sign Up</MyButton>

            <div className="relative">
              {(error.allError || error.email?.title || error.password) && (
                <div className="flex flex-col">
                  <p className="text-red-500 text-center ">{error.allError}</p>
                  <p className="text-red-500 text-center ">
                    {error.email?.title}
                  </p>
                  {error.password?.map((el, index) => (
                    <p key={index} className="text-red-500 text-center ">{el.title}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-white text-center flex flex-col">
            Уже есть аккаунт?{" "}
            <Link href="/login" scroll={false}>
              Login to account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
