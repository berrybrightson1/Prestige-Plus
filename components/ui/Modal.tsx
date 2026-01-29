'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    className?: string
    variant?: 'center' | 'bottom'
}

export function Modal({ isOpen, onClose, children, title, className, variant = 'center' }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const isBottom = variant === 'bottom'

    return createPortal(
        <div className={cn(
            "fixed inset-0 z-50 flex p-4",
            isBottom ? "items-end justify-center sm:items-center" : "items-center justify-center"
        )}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Content */}
            <div
                className={cn(
                    "relative w-full max-w-lg bg-white shadow-2xl p-6 transform transition-all",
                    isBottom
                        ? "rounded-t-3xl rounded-b-none sm:rounded-2xl animate-modal-slide-up"
                        : "rounded-2xl animate-modal-zoom-in",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    {title && <h2 className="text-xl font-bold text-accent-navy">{title}</h2>}
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-cream-100 transition-colors text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="mb-2">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
