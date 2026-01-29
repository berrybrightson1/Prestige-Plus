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
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
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

    // We use createPortal to ensure the modal is always on top of everything
    // assuming 'body' exists. 
    // If SSR issues arise, we might need a mounted check, but standard Next.js 'use client' usually handles this fine after hydration.
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Content */}
            <div
                className={cn(
                    "relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 transform transition-all animate-in fade-in zoom-in-95 duration-200",
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
                <div className="mb-6">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
