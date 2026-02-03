import React from "react";

type InputProps = {
  label?: string;
  name: string;

  error?: boolean;
  helperText?: string;
  maxLength: number;
  className?: string;
  placeholder?: string;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export default function MyTextArea({
  label,
  name,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  maxLength,
  error = false,
  helperText,
}: InputProps) {
  const errorId = `${name}-error`;

  return (
    <label className="relative flex flex-col gap-1">
      {label && <span className="text-[#6D6D71] text-sm">{label}</span>}

      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={() => onChange}
        onBlur={onBlur}
        aria-invalid={error}
        maxLength={maxLength}
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
