import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "ghost";
  loading?: boolean;
}

export function Button({
  variant = "filled",
  loading = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded font-semibold transition focus:outline-none disabled:opacity-50";
  const variantStyles: Record<string, string> = {
    filled: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
  };
  const style = variantStyles[variant] || variantStyles.filled;
  return (
    <button
      className={classNames(base, style, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
