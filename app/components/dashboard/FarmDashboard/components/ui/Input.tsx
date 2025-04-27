import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      {...props}
    />
  );
};
