import Link from "next/link";
import React from "react";

const Button = ({
  text,
  onClick,
  type = "button",
  urlLink = false,
  href = "",
  disabled = false,
  className = "flex justify-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded-2xl",
  ...props
}) => {
  return urlLink ? (
    <Link href={href} className={className}>
      {text}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
