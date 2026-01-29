'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Download, Mail, Calendar, FileText } from 'lucide-react'

interface Application {
    id: string
    job_id: string
    job_title: string
    candidate_name: string
    email: string
    cv_url: string
    message: string
    created_at: Date
}

// Mock data
const mockApplications: Application[] = [
    {
        id: '1',
        job_id: '1',
        job_title: 'Luxury Resort Chef',
        candidate_name: 'John Smith',
        email: 'john.smith@example.com',
        cv_url: '/cvs/john-smith.pdf',
        message: 'I am very interested in this position and have 5 years of experience...',
        created_at: new Date('2024-01-20'),
    },
    {
        id: '2',
        job_id: '1',
        job_title: 'Luxury Resort Chef',
        candidate_name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        cv_url: '/cvs/sarah-johnson.pdf',
        message: 'Excited about this opportunity. I have worked in Michelin-starred restaurants...',
        created_at: new Date('2024-01-22'),
    },
]

export default function ApplicationsPage() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [applications, setApplications] = useState<Application[]>([])

    useEffect(() => {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
            fetchApplications()
        }
    }, [router])

    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/applications')
            if (!res.ok) throw new Error('Failed to fetch applications')
            const data = await res.json()

            // Transform data to match interface (handling nested job title)
            const formatted = data.map((app: any) => ({
                id: app.id,
                job_id: app.job_id,
                job_title: app.job?.title || 'Unknown Job',
                candidate_name: app.candidate_name,
                email: app.email,
                cv_url: app.cv_url,
                message: app.message,
                created_at: new Date(app.created_at),
            }))

            setApplications(formatted)
        } catch (error) {
            console.error('Error loading applications:', error)
        }
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="heading-secondary mb-2">Applications</h1>
                        <p className="text-gray-600">{applications.length} total applications</p>
                    </div>
                    <Link href="/admin">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>

                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map((application) => (
                            <Card key={application.id} variant="soft">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-1">
                                            {application.candidate_name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Applied for: <span className="font-medium">{application.job_title}</span>
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Mail className="h-4 w-4" />
                                                <a href={`mailto:${application.email}`} className="hover:text-accent-navy">
                                                    {application.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{application.created_at.toLocaleDateString('en-GB')}</span>
                                            </div>
                                        </div>

                                        {application.message && (
                                            <p className="text-sm text-gray-700 italic line-clamp-2">
                                                &ldquo;{application.message}&rdquo;
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <a href={application.cv_url} download>
                                            <Button variant="primary" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download CV
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card variant="floating">
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No applications yet</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}
