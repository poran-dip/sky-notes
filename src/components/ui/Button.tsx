import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md";
  variant?: "primary";
}

const baseStyles = "font-medium transition-all duration-200 cursor-pointer";

const buttonSizes = {
  sm: "py-1 px-4 rounded-2xl text-sm",
  md: "py-2 px-6 rounded-3xl",
};

const buttonVariants = {
  primary:
    "bg-blue-50 text-blue-400 shadow-md shadow-black/20 inset-shadow-[0_-2px_4px] inset-shadow-blue-900/50 hover:inset-shadow-[0_-4px_6px] hover:inset-shadow-blue-400/50",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        baseStyles,
        buttonSizes[size],
        buttonVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
