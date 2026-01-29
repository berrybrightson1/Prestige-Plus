import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-medium transition-all',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    {
                        'bg-accent-navy text-white hover:bg-accent-navy/90': variant === 'primary',
                        'bg-accent-gold text-white hover:bg-accent-gold/90': variant === 'secondary',
                        'border-2 border-accent-navy text-accent-navy hover:bg-accent-navy hover:text-white': variant === 'outline',
                        'hover:bg-cream-200': variant === 'ghost',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'

export { Button }
