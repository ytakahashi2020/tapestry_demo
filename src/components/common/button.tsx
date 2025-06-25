'use client'

import { cn } from '@/utils/utils'
import { ReactNode } from 'react'

type IVariant = 'default' | 'secondary' | 'ghost' | 'primary' | 'outline'

interface Props {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: IVariant
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

function getButtonStyles(variant?: IVariant) {
  switch (variant) {
    case 'secondary':
      return 'h-10 px-4 bg-gradient-to-r from-purple-300 to-indigo-400 text-white shadow-lg hover:shadow-xl hover:from-purple-400 hover:to-indigo-500 rounded-2xl font-bold'
    case 'ghost':
      return 'text-gray-600 hover:bg-pink-100 hover:text-pink-700 rounded-xl px-3 py-2'
    case 'primary':
      return 'h-10 px-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-purple-600 rounded-2xl font-bold'
    case 'outline':
      return 'h-10 px-4 border-2 border-pink-300 bg-white shadow-lg hover:bg-pink-50 hover:border-pink-400 text-pink-600 rounded-2xl font-bold'
    case 'default':
    default:
      return 'h-10 px-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-purple-600 rounded-2xl font-bold'
  }
}

export function Button({
  children,
  disabled,
  variant = 'default',
  className,
  type = 'button',
  onClick,
}: Props) {
  return (
    <button
      className={cn(
        className,
        'py-2 cursor-pointer flex items-center transition-all duration-300 hover:scale-105',
        getButtonStyles(variant),
        disabled ? 'opacity-50! cursor-not-allowed!' : '',
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
