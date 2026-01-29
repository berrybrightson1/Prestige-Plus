'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type NotificationType = 'success' | 'error' | 'neutral'

interface Notification {
    id: string
    message: string
    type: NotificationType
}

interface CommandPillContextType {
    showNotification: (message: string, type: NotificationType) => void
}

const CommandPillContext = createContext<CommandPillContextType | undefined>(undefined)

export function CommandPillProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const showNotification = useCallback((message: string, type: NotificationType) => {
        const id = Math.random().toString(36).substring(7)
        setNotifications(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id))
        }, 4000)
    }, [])

    return (
        <CommandPillContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {notifications.map(notification => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`
                px-6 py-3 rounded-full font-medium text-white shadow-float
                ${notification.type === 'success' ? 'bg-green-600' : ''}
                ${notification.type === 'error' ? 'bg-red-600' : ''}
                ${notification.type === 'neutral' ? 'bg-zinc-700' : ''}
              `}
                        >
                            {notification.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </CommandPillContext.Provider>
    )
}

export function useCommandPill() {
    const context = useContext(CommandPillContext)
    if (!context) {
        throw new Error('useCommandPill must be used within CommandPillProvider')
    }
    return context
}
