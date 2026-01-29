'use client'

import { useEffect, useState } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Application {
    id: string
    candidate_name: string
    status: string
    opportunity: {
        title: string
    }
    cv_url: string
    created_at: string
}

const COLUMNS = [
    { id: 'PENDING', label: 'Pending', color: 'bg-gray-100 border-gray-200' },
    { id: 'REVIEWING', label: 'Reviewing', color: 'bg-blue-50 border-blue-200' },
    { id: 'INTERVIEW', label: 'Interview', color: 'bg-purple-50 border-purple-200' },
    { id: 'OFFER', label: 'Offer', color: 'bg-green-50 border-green-200' },
    { id: 'REJECTED', label: 'Rejected', color: 'bg-red-50 border-red-200' },
]

export default function KanbanBoardPage() {
    const router = useRouter()
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/applications')
            const data = await res.json()
            setApplications(data)
        } catch (error) {
            console.error('Failed to fetch applications:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (id: string, newStatus: string) => {
        setUpdatingId(id)
        try {
            await fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })
            // Optimistic update
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ))
        } catch (error) {
            console.error('Failed to update status:', error)
            alert('Failed to update status')
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-accent-navy" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream-50 p-6 overflow-x-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-accent-navy">Application Board</h1>
                    <p className="text-gray-500">Manage candidate pipeline</p>
                </div>
                <Link href="/admin" className="text-sm font-medium text-accent-navy hover:underline">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="flex gap-6 min-w-max pb-4">
                {COLUMNS.map(col => (
                    <div key={col.id} className={`w-72 flex-shrink-0 rounded-xl border ${col.color} p-4 flex flex-col h-full`}>
                        <div className="font-semibold text-accent-navy mb-4 flex items-center justify-between">
                            {col.label}
                            <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold border border-gray-100 shadow-sm">
                                {applications.filter(a => a.status === col.id).length}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {applications.filter(a => a.status === col.id).map(app => (
                                <div key={app.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900 truncate" title={app.candidate_name}>
                                            {app.candidate_name}
                                        </h3>
                                        <a href={app.cv_url} target="_blank" className="text-xs text-accent-gold hover:underline">CV</a>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">{app.opportunity?.title || 'Unknown Job'}</p>

                                    <select
                                        title="Change Status"
                                        className="w-full text-xs border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-accent-navy"
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        disabled={updatingId === app.id}
                                    >
                                        {COLUMNS.map(option => (
                                            <option key={option.id} value={option.id}>
                                                Move to {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                            {applications.filter(a => a.status === col.id).length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-xs italic">
                                    No candidates
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
