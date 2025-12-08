import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

type InputProps = {
  label?: string;
  name: string;
  className?: string;
  placeholder?: string;
  value?: string;
  type?:
    | "password"
    | "text"
    | "email"
    | "button"
    | "file"
    | "radio"
    | "reset"
    | "submit";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePassword?: boolean;
  IconShow?: React.ReactNode;
  IconHide?: React.ReactNode;
};

export default function MyInput({
  label,
  name,
  placeholder,
  className,
  value,
  type = "text",
  onChange,
  togglePassword = false,
  IconShow = <EyeTwoTone />,
  IconHide = <EyeInvisibleOutlined />,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  
  const finalType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <label className="relative flex flex-col gap-1">
      {label && <span>{label}</span>}

      <input
        type={finalType}
        name={name}
        placeholder={placeholder}
        className={`${className}
    glass w-full h-[45px] px-4 text-lg rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/70 backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 hover:backdrop-blur-lg hover:bg-white/20
  `}
        value={value}
        onChange={onChange}
      />
      {type === "password" && togglePassword === true && (
        <div
          onClick={() => setShowPassword((el) => !el)}
          className="absolute right-3 top-2.5 cursor-pointer"
        >
          {showPassword ? IconShow : IconHide}
        </div>
      )}
    </label>
  );
}
