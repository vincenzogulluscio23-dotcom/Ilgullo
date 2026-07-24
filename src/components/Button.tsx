import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'pill' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'arrow-up-right' | 'arrow-right' | 'none';
  fullWidthOnMobile?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  icon = 'none',
  fullWidthOnMobile = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 transition-all duration-300 font-sans tracking-wide text-center cursor-pointer select-none min-h-[44px]";
  
  const variants = {
    primary: "bg-[#FF5A36] text-white hover:bg-[#E54A28] rounded-full shadow-sm hover:shadow-md",
    secondary: "bg-[#F1F0EB] text-[#09090A] hover:bg-white rounded-full font-medium",
    outline: "border border-[#28282D] text-[#F1F0EB] hover:border-[#FF5A36] hover:text-[#FF5A36] rounded-full bg-[#09090A]/50 backdrop-blur-sm",
    pill: "border border-[#28282D] text-[#C9C7C1] hover:text-white hover:border-[#F1F0EB] rounded-full text-xs font-mono uppercase tracking-widest px-4 py-2 bg-[#121214]",
    ghost: "text-[#C9C7C1] hover:text-[#FF5A36] bg-transparent",
    text: "text-[#F1F0EB] hover:text-[#FF5A36] underline underline-offset-8 decoration-[#28282D] hover:decoration-[#FF5A36]"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 min-h-[40px]",
    md: "text-sm px-6 py-3 min-h-[44px]",
    lg: "text-base px-8 py-4 min-h-[50px]"
  };

  const mobileStyles = fullWidthOnMobile ? "w-full sm:w-auto" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${mobileStyles} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon === 'arrow-up-right' && <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      {icon === 'arrow-right' && <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};
