import { ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-primary hover:bg-violet-600 py-3 px-4 rounded-lg text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50',
        // 'bg-gradient-to-r from-[#d1bcff] to-[#64558e] py-3 px-4 rounded-lg text-gray-50 flex items-center justify-center gap-2 hover:from-[#e8def7] hover:to-[#64558e] transition-all disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};