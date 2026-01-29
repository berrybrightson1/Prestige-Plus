'use client'

import { cn } from '@/lib/utils'

interface CategoryFilterProps {
    categories: string[]
    selectedCategory: string | null
    onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-3 justify-center">
            <button
                onClick={() => onSelectCategory(null)}
                className={cn(
                    'px-4 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300',
                    selectedCategory === null
                        ? 'bg-accent-navy text-white shadow-md scale-105 border border-accent-navy'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-accent-navy border border-gray-200'
                )}
            >
                All Jobs
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                        'px-4 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300',
                        selectedCategory === category
                            ? 'bg-accent-navy text-white shadow-md scale-105 border border-accent-navy'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-accent-navy border border-gray-200'
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
