'use client'

import { useState } from 'react'
import { Bell, CheckCircle, Loader2 } from 'lucide-react'

interface JobAlertProps {
    category: string
}

export function JobAlert({ category }: JobAlertProps) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    search_query: category
                }),
            })

            if (!res.ok) throw new Error('Failed to subscribe')

            setStatus('success')
            setEmail('')
        } catch (error) {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    return (
        <div className="bg-accent-navy/5 rounded-xl p-6 border border-accent-navy/10 mt-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent-navy/10 rounded-full text-accent-navy">
                    <Bell className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-accent-navy">Job Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified for new {category} jobs</p>
                </div>
            </div>

            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-4 text-green-600 animate-in fade-in">
                    <CheckCircle className="h-8 w-8 mb-2" />
                    <p className="font-medium">You're subscribed!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-navy/20 focus:border-accent-navy transition-all text-sm"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-accent-navy text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                        Subscribe
                    </button>
                    {status === 'error' && (
                        <p className="text-xs text-red-500 text-center">Something went wrong. Try again.</p>
                    )}
                </form>
            )}
        </div>
    )
}
