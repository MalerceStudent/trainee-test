import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
}

export default function Button({ children, full, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded 
        ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}
