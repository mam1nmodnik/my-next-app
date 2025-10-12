"use client"
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const inpStyle =
    "glass w-full h-[45px] px-4 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 hover:backdrop-blur-lg hover:bg-white/20";

  const [form, setForm] = useState({ login: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('отправка')
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-[25rem] pt-10 pr-10 pl-10 pb-5 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h1 className="text-white text-xl">Sign Up</h1>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="login"
              className={inpStyle}
              placeholder="login"
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
            />
            <input
              type="email"
              name="email"
              className={inpStyle}
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              name="password"
              className={inpStyle}
              placeholder="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-5">
            <label htmlFor="" className="flex gap-2 text-white pl-4">
              <input type="checkbox" name="" id="" className="w-4" />I Agree
              with privacy and policy
            </label>
            <button
              type="submit"
              className="w-full text-lg p-2 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md backdrop-saturate-150 shadow-md hover:shadow-lg hover:backdrop-blur-lg hover:bg-white/20 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
            {message && <p>{message}</p>}
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
