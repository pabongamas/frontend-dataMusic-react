


import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'icon'
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors'
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'text-gray-700 hover:bg-gray-100'
  }
  const sizeStyles = {
    default: 'px-4 py-2',
    icon: 'p-2'
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
