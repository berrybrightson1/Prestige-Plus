'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCommandPill } from '@/components/ui/CommandPill'

export default function AdminLoginPage() {
    const router = useRouter()
    const { showNotification } = useCommandPill()
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simple authentication - in production, use proper auth
            // For demo: admin@prestigeplus.com / admin123
            if (credentials.email === 'admin@prestigeplus.com' && credentials.password === 'admin123') {
                localStorage.setItem('admin_authenticated', 'true')
                showNotification('Login successful!', 'success')
                router.push('/admin')
            } else {
                showNotification('Invalid credentials', 'error')
            }
        } catch (error) {
            showNotification('Login failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="heading-secondary mb-2">Admin Portal</h1>
                    <p className="text-gray-600">Sign in to manage job listings and applications</p>
                </div>

                <div className="floating-card">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            placeholder="admin@prestigeplus.com"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />

                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Demo credentials: admin@prestigeplus.com / admin123
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
