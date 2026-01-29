'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { OpportunityCard } from '@/components/jobs/OpportunityCard'
import { ArrowLeft, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminJobsPage() {
    const router = useRouter()
    const [jobs, setJobs] = useState<any[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [activeTab, setActiveTab] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED')

    useEffect(() => {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Fetch all jobs, then we filter client-side for simplicity
                const res = await fetch('/api/jobs')
                if (!res.ok) throw new Error('Failed to fetch jobs')
                const data = await res.json()
                setJobs(data)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            }
        }
        if (isAuthenticated) {
            fetchJobs()
        }
    }, [isAuthenticated])

    const filteredJobs = jobs.filter(job => job.status === activeTab)

    if (!isAuthenticated) return null

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link href="/admin" className="inline-flex items-center gap-2 text-accent-navy hover:underline mb-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                        <h1 className="heading-secondary">Manage Jobs</h1>
                    </div>
                    <Link href="/admin/jobs/create">
                        <Button variant="primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Job
                        </Button>
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-cream-300 mb-8">
                    <button
                        onClick={() => setActiveTab('PUBLISHED')}
                        className={cn(
                            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'PUBLISHED'
                                ? 'border-accent-navy text-accent-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                    >
                        Published ({jobs.filter(j => j.status === 'PUBLISHED').length})
                    </button>
                    <button
                        onClick={() => setActiveTab('DRAFT')}
                        className={cn(
                            'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'DRAFT'
                                ? 'border-accent-navy text-accent-navy'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                    >
                        Drafts ({jobs.filter(j => j.status === 'DRAFT').length})
                    </button>
                </div>

                {/* Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid-3-col">
                        {filteredJobs.map((job) => (
                            <OpportunityCard key={job.id} {...job} href={`/admin/jobs/${job.id}`} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 rounded-lg border-2 border-dashed border-cream-300">
                        <p className="text-gray-600 text-lg">No {activeTab.toLowerCase()} jobs found.</p>
                        <Link href="/admin/jobs/create" className="text-accent-navy hover:underline mt-2 inline-block">
                            Create your first job
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
