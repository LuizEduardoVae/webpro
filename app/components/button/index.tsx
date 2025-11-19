import { ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-primary hover:bg-orange-600 py-3 px-8 rounded-full text-white font-medium flex items-center justify-center gap-2 transition-all shadow-button hover:shadow-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};