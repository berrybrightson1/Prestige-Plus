'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/jobs/SearchBar'
import { CategoryFilter } from '@/components/jobs/CategoryFilter'
import { OpportunityCard } from '@/components/jobs/OpportunityCard'

// Mock data - removed

const categories = ['Culinary', 'Hospitality', 'Wellness', 'Management']

export default function JobsPage() {
    const [jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs?status=PUBLISHED')
                if (!res.ok) throw new Error('Failed to fetch jobs')
                const data = await res.json()
                setJobs(data)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    // Filter jobs based on search and category
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = searchQuery === '' ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = selectedCategory === null ||
            job.title.toLowerCase().includes(selectedCategory.toLowerCase())

        return matchesSearch && matchesCategory
    })

    return (
        <div className="py-6 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Browse Opportunities</h1>
                    <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover exciting work-travel positions around the world
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <SearchBar onSearch={setSearchQuery} />
                </div>

                {/* Category Filter */}
                <div className="mb-12">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} found
                    </p>
                </div>

                {/* Job Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid-3-col">
                        {filteredJobs.map((job) => (
                            <OpportunityCard key={job.id} {...job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No opportunities found matching your criteria.</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
