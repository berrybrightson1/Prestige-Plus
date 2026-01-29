'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'

interface SearchBarProps {
    onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search jobs by title, location, or keyword..."
                    className="w-full pl-12 pr-4 py-3 text-base rounded-xl border-2 border-cream-300 bg-white text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent transition-all"
                />
            </div>
        </form>
    )
}
