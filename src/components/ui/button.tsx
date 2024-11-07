"use client";

import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={`w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
