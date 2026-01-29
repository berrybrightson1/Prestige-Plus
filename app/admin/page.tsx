'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Users, Briefcase, LogOut, ArrowRight, CheckCircle, Search, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboardPage() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        jobs: [] as any[],
        applications: [] as any[],
        stats: {
            totalJobs: 0,
            activeListings: 0,
            totalApplications: 0,
            totalViews: 0
        }
    })

    useEffect(() => {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated')
        router.push('/admin/login')
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!isAuthenticated) return

            try {
                const [jobsRes, appsRes] = await Promise.all([
                    fetch('/api/jobs', { cache: 'no-store' }),
                    fetch('/api/applications', { cache: 'no-store' })
                ])

                const jobs = jobsRes.ok ? await jobsRes.json() : []
                const apps = appsRes.ok ? await appsRes.json() : []

                setData({
                    jobs: jobs.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
                    applications: apps.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
                    stats: {
                        totalJobs: jobs.length,
                        activeListings: jobs.filter((j: any) => j.status === 'PUBLISHED').length,
                        totalApplications: apps.length,
                        totalViews: jobs.reduce((acc: number, job: any) => acc + (job.views || 0), 0)
                    }
                })
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [isAuthenticated])

    if (!isAuthenticated) return null

    const StatCard = ({ label, value, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-xl border border-cream-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                <h3 className="text-3xl font-bold text-accent-navy">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
                <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
            </div>
        </div>
    )

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            PUBLISHED: 'bg-green-100 text-green-700',
            DRAFT: 'bg-gray-100 text-gray-700',
            FILLED: 'bg-blue-100 text-blue-700'
        }
        return (
            <span className={cn(
                'px-2.5 py-0.5 rounded-full text-xs font-medium',
                styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-600'
            )}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
        )
    }

    return (
        <div className="min-h-screen bg-cream-50/50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-accent-navy">Overview</h1>
                        <p className="text-gray-500 text-sm">Welcome back, Admin</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:bg-red-50 border-red-200">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        label="Total Jobs"
                        value={data.stats.totalJobs}
                        icon={Briefcase}
                        color="bg-blue-600"
                    />
                    <StatCard
                        label="Active Listings"
                        value={data.stats.activeListings}
                        icon={CheckCircle}
                        color="bg-green-600"
                    />
                    <StatCard
                        label="Applications"
                        value={data.stats.totalApplications}
                        icon={Users}
                        color="bg-purple-600"
                    />
                    <StatCard
                        label="Total Views"
                        value={data.stats.totalViews}
                        icon={Eye}
                        color="bg-amber-600"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Recent Jobs */}
                    <div className="bg-white rounded-xl border border-cream-200 shadow-sm flex flex-col h-full">
                        <div className="p-6 border-b border-cream-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-accent-navy">Recent Jobs</h2>
                            <Link href="/admin/jobs/create">
                                <Button size="sm" variant="primary">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Job
                                </Button>
                            </Link>
                        </div>

                        <div className="p-0 flex-1">
                            {loading ? (
                                <div className="p-6 text-center text-gray-500">Loading jobs...</div>
                            ) : data.jobs.length > 0 ? (
                                <div className="divide-y divide-cream-100">
                                    {data.jobs.map((job) => (
                                        <Link
                                            key={job.id}
                                            href={`/admin/jobs/${job.id}`}
                                            className="block p-4 hover:bg-cream-50 transition-colors group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-accent-navy transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <StatusBadge status={job.status} />
                                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="h-3 w-3" />
                                                            {job.views || 0}
                                                        </span>
                                                        <span>
                                                            {new Date(job.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No jobs created yet.
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-cream-100 bg-cream-50/30 rounded-b-xl">
                            <Link href="/admin/jobs" className="flex items-center justify-center text-sm font-medium text-accent-navy hover:underline">
                                View Full Job List
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white rounded-xl border border-cream-200 shadow-sm flex flex-col h-full">
                        <div className="p-6 border-b border-cream-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-accent-navy">Recent Applications</h2>
                            <div className="h-9"></div> {/* Spacer for alignment */}
                        </div>

                        <div className="p-0 flex-1">
                            {loading ? (
                                <div className="p-6 text-center text-gray-500">Loading applications...</div>
                            ) : data.applications.length > 0 ? (
                                <div className="divide-y divide-cream-100">
                                    {data.applications.map((app) => (
                                        <div key={app.id} className="p-4 hover:bg-cream-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-foreground">
                                                        {app.candidate_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Applied for <span className="font-medium text-accent-navy">{app.opportunity?.title || 'Unknown Role'}</span>
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <a
                                                        href={app.cv_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-medium text-accent-gold hover:underline flex items-center"
                                                    >
                                                        View CV
                                                    </a>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(app.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No applications received yet.
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-cream-100 bg-cream-50/30 rounded-b-xl">
                            <Link href="/admin/applications" className="flex items-center justify-center text-sm font-medium text-accent-navy hover:underline">
                                View All Applications
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
