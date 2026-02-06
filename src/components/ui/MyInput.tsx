import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useState } from "react";

type InputProps = {
  label?: string;
  name: string;

  error?: boolean;
  helperText?: string;

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
  onBlur?: () => void;

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
  onBlur,

  error = false,
  helperText,

  togglePassword = false,
  IconShow = <EyeTwoTone />,
  IconHide = <EyeInvisibleOutlined />,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const finalType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const errorId = `${name}-error`;

  return (
    <label className="relative flex flex-col gap-1">
      {label && <span className="text-[#6D6D71] text-sm">{label}</span>}

      <input
        type={finalType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        className={`
          ${
            className
              ? className
              : `  p-2
          rounded-lg
          bg-black
          text-white
          border
          transition
          focus:outline-none`
          }
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-white/30 focus:border-blue-400"
          }
        `}
      />

      {type === "password" && togglePassword && (
        <div
          onClick={() => setShowPassword((el) => !el)}
          className="absolute right-3 top-[9px] cursor-pointer"
        >
          {showPassword ? IconShow : IconHide}
        </div>
      )}

      {helperText && (
        <span
          id={errorId}
          role={error ? "alert" : undefined}
          className={`text-xs ${error ? "text-red-500" : "text-gray-400"}`}
        >
          {helperText}
        </span>
      )}
    </label>
  );
}
