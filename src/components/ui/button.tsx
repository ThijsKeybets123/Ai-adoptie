import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export const Button: React.FC<Props> = ({ children, className = '', variant = 'primary', size = 'md', ...rest }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }
  
  const sizes = {
    sm: "h-9 rounded-md px-3",
    md: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8"
  }

  const variantClass = variants[variant as keyof typeof variants] || variants.primary
  const sizeClass = sizes[size as keyof typeof sizes] || sizes.md

  return (
    <button {...rest} className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </button>
  )
}

export default Button
