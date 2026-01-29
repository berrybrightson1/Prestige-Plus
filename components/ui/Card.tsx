import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'floating' | 'soft'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'soft', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-white',
                    {
                        'rounded-2xl shadow-float p-6': variant === 'floating',
                        'rounded-xl shadow-soft p-4': variant === 'soft',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = 'Card'

export { Card }
