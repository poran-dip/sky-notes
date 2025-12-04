import type { ReactNode } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button 
      className={`py-1 px-4 md:px-6 rounded-4xl text-sm sm:text-lg md:text-xl font-medium bg-blue-50 text-blue-400 shadow-md shadow-black/20 cursor-pointer inset-shadow-[0_-2px_4px] inset-shadow-blue-900/50 hover:inset-shadow-[0_-4px_6px] hover:inset-shadow-blue-400/50 transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
