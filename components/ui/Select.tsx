import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
    label: React.ReactNode
    value: string
}

interface SelectProps {
    label?: string
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
    error?: string
    className?: string
    placeholder?: string
}

export function Select({
    label,
    value,
    onChange,
    options,
    error,
    className,
    placeholder = 'Select an option',
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [searchBuffer, setSearchBuffer] = useState('')
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    const selectedOption = options.find((opt) => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (optionValue: string) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    // Handle type-to-select
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen && document.activeElement !== containerRef.current?.querySelector('button')) return
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                const char = e.key.toLowerCase()
                const newBuffer = searchBuffer + char
                setSearchBuffer(newBuffer)

                // Clear buffer after delay
                if (searchTimeout.current) clearTimeout(searchTimeout.current)
                searchTimeout.current = setTimeout(() => setSearchBuffer(''), 1000)

                // Find match
                const match = options.find(opt => {
                    const labelMatch = typeof opt.label === 'string' && (
                        opt.label.toLowerCase().startsWith(newBuffer) ||
                        (newBuffer.length === 1 && opt.label.toLowerCase().startsWith(char))
                    )
                    const valueMatch = opt.value.toLowerCase().startsWith(newBuffer) ||
                        (newBuffer.length === 1 && opt.value.toLowerCase().startsWith(char))

                    return labelMatch || valueMatch
                })

                if (match) {
                    onChange(match.value)
                    // If closed and focused, we don't necessarily open, just select (standard behavior)
                    // If open, we want to scroll to it (handled by auto-scroll logic if added, or just selection update)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, options, onChange, searchBuffer])

    // Scroll to selected item when opened
    useEffect(() => {
        if (isOpen && value) {
            const selectedEl = document.getElementById(`option-${value}`)
            if (selectedEl) {
                selectedEl.scrollIntoView({ block: 'nearest' })
            }
        }
    }, [isOpen, value])

    return (
        <div className="w-full relative" ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'w-full px-4 py-3 text-base text-left rounded-xl border-2 border-cream-300',
                    'bg-white text-foreground flex items-center justify-between',
                    'focus:outline-none focus:ring-2 focus:ring-accent-navy focus:border-transparent',
                    'transition-all',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
            >
                <span className={!selectedOption ? 'text-gray-400' : ''}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform duration-200", isOpen && "transform rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-60 overflow-auto scrollbar-hide">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                id={`option-${option.value}`}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={cn(
                                    'w-full px-4 py-2.5 text-left text-base transition-colors duration-150',
                                    option.value === value
                                        ? 'bg-accent-navy text-white font-medium'
                                        : 'text-gray-700 hover:bg-blue-50 hover:text-accent-navy'
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
