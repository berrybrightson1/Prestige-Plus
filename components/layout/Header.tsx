'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse Jobs', href: '/jobs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
]

export function Header() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-cream-300">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-xl md:text-2xl font-bold text-accent-navy tracking-tight">
                            Prestige Plus
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'relative text-sm font-medium transition-colors hover:text-accent-navy py-2',
                                    pathname === item.href
                                        ? 'text-accent-navy font-bold'
                                        : 'text-gray-600'
                                )}
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-navy rounded-full transform scale-x-100 transition-transform duration-300" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden p-2 -mr-2 rounded-xl transition-colors active:bg-cream-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6 text-accent-navy" />
                        ) : (
                            <Menu className="h-6 w-6 text-accent-navy" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-cream-200 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col gap-5">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'text-lg font-bold transition-colors px-2 py-1',
                                        pathname === item.href
                                            ? 'text-accent-navy'
                                            : 'text-gray-500 hover:text-accent-navy'
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
