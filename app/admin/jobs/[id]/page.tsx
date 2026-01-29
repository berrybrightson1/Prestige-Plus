'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { useCommandPill } from '@/components/ui/CommandPill'
import { Modal } from '@/components/ui/Modal'
import { ArrowLeft, Trash2 } from 'lucide-react'

export default function EditJobPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params)
    const router = useRouter()
    const { showNotification } = useCommandPill()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        benefits: '',
        location: '',
        salary: '',
        category: 'Hospitality',
        images: [] as string[],
        status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'FILLED',
        company_logo: '', // Keep for compatibility
    })

    useEffect(() => {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${params.id}`)
                if (!res.ok) throw new Error('Failed to fetch job')
                const data = await res.json()
                // Ensure category defaults if missing, handle existing data fields
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    requirements: data.requirements || '',
                    benefits: data.benefits || '',
                    location: data.location || '',
                    salary: data.salary || '',
                    category: data.category || 'Hospitality',
                    images: data.images || [],
                    status: data.status || 'DRAFT',
                    company_logo: data.company_logo || '',
                })
            } catch (error) {
                console.error('Error fetching job:', error)
                showNotification('Failed to load job details', 'error')
                router.push('/admin/jobs')
            } finally {
                setFetching(false)
            }
        }

        if (isAuthenticated) {
            fetchJob()
        }
    }, [isAuthenticated, params.id, router, showNotification])

    const handleSubmit = async (e: React.FormEvent, status: 'DRAFT' | 'PUBLISHED') => {
        e.preventDefault()
        setLoading(true)

        const submissionData = {
            ...formData,
            status: status,
        }

        try {
            const res = await fetch(`/api/jobs/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            })

            if (!res.ok) throw new Error('Failed to update job')

            showNotification(
                status === 'DRAFT' ? 'Job saved as draft!' : 'Job published successfully!',
                'success'
            )
            router.push('/admin/jobs')
        } catch (error) {
            console.error('Update error:', error)
            showNotification('Failed to update job', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/jobs/${params.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete job')

            showNotification('Job deleted successfully', 'success')
            router.push('/admin/jobs')
        } catch (error) {
            console.error('Delete error:', error)
            showNotification('Failed to delete job', 'error')
            setLoading(false)
            setShowDeleteModal(false)
        }
    }

    if (!isAuthenticated) return null
    if (fetching) return <div className="p-12 text-center text-gray-500">Loading job details...</div>

    return (
        <div className="py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-accent-navy hover:underline">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Jobs
                    </Link>
                    <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Job
                    </Button>
                </div>

                <h1 className="heading-secondary mb-8">Edit Job</h1>

                <form className="space-y-6">
                    {/* Basic Info */}
                    <div className="floating-card">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                        <div className="space-y-4">
                            <Input
                                label="Job Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Luxury Resort Chef"
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., Maldives"
                                    required
                                />

                                <Input
                                    label="Salary"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    placeholder="e.g., £2,500 + Benefits"
                                    required
                                />
                            </div>

                            <div>
                                <Select
                                    label="Category"
                                    value={formData.category}
                                    onChange={(value) => setFormData({ ...formData, category: value })}
                                    options={[
                                        { label: 'Culinary', value: 'Culinary' },
                                        { label: 'Hospitality', value: 'Hospitality' },
                                        { label: 'Wellness', value: 'Wellness' },
                                        { label: 'Management', value: 'Management' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="floating-card">
                        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                        <Textarea
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Provide a detailed description of the role..."
                            rows={6}
                            required
                        />
                    </div>

                    {/* Requirements */}
                    <div className="floating-card">
                        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                        <Textarea
                            label="Requirements"
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            placeholder="List the qualifications and requirements..."
                            rows={6}
                            required
                        />
                    </div>

                    {/* Benefits */}
                    <div className="floating-card">
                        <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                        <Textarea
                            label="Benefits"
                            value={formData.benefits}
                            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                            placeholder="List all benefits and perks..."
                            rows={6}
                            required
                        />
                    </div>

                    {/* Images */}
                    <div className="floating-card">
                        <h2 className="text-xl font-semibold mb-4">Images</h2>
                        <ImageUploader
                            images={formData.images}
                            onImagesChange={(images) => setFormData({ ...formData, images })}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t border-cream-200">
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={loading || formData.status === 'DRAFT'}
                            onClick={(e) => handleSubmit(e, 'DRAFT')}
                            className="flex-1"
                        >
                            {loading ? 'Saving...' : (formData.status === 'PUBLISHED' ? 'Unpublish (Save as Draft)' : 'Save as Draft')}
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, 'PUBLISHED')}
                            className="flex-1"
                        >
                            {loading ? 'Publishing...' : (formData.status === 'PUBLISHED' ? 'Save Changes' : 'Publish Job')}
                        </Button>
                    </div>
                </form>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    title="Delete Job"
                >
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Are you sure you want to delete this job posting? This action cannot be undone.
                        </p>
                        <div className="flex gap-4 justify-end pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="bg-red-600 hover:bg-red-700 text-white border-transparent"
                                onClick={confirmDelete}
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Delete Job'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
