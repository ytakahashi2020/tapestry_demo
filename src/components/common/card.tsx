import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: Props) {
  return (
    <div className={classNames('bg-white border-2 border-pink-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300', className)}>
      {children}
    </div>
  )
}
