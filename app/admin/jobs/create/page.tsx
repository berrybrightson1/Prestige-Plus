'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { compressImage } from '@/lib/image-utils'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { useCommandPill } from '@/components/ui/CommandPill'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

import { countries } from '@/lib/countries'

export default function CreateJobPage() {
    const router = useRouter()
    const { showNotification } = useCommandPill()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        benefits: '',
        location: '',
        country: '',
        salary: '',
        category: 'Hospitality', // Default category
        images: [] as string[],
        status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'FILLED',
    })

    useEffect(() => {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth !== 'true') {
            router.push('/admin/login')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])


    const handleSubmit = async (e: React.FormEvent, status: 'DRAFT' | 'PUBLISHED') => {
        e.preventDefault()
        setLoading(true)

        const submissionData = {
            ...formData,
            status: status,
            company_logo: '/placeholder-logo.png', // Default placeholder as logo is removed
        }

        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to create job')
            }

            showNotification(
                status === 'DRAFT' ? 'Job saved as draft!' : 'Job published successfully!',
                'success'
            )
            router.push('/admin')
        } catch (error) {
            console.error('Submission error:', error)
            showNotification('Failed to create job', 'error')
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Link href="/admin" className="inline-flex items-center gap-2 text-accent-navy hover:underline mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <h1 className="heading-secondary mb-8">Create New Job</h1>

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
                                    placeholder="e.g., London, UK"
                                    required
                                />

                                <Select
                                    label="Country"
                                    value={formData.country}
                                    onChange={(value) => setFormData({ ...formData, country: value })}
                                    options={countries.map(c => ({
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                                                    alt={c.name}
                                                    className="w-5 h-auto object-cover rounded-[2px]"
                                                />
                                                <span>{c.name}</span>
                                            </div>
                                        ),
                                        value: c.name
                                    }))}
                                    placeholder="Select Country"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, 'DRAFT')}
                            className="flex-1"
                        >
                            {loading ? 'Saving...' : 'Save as Draft'}
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            disabled={loading}
                            onClick={(e) => handleSubmit(e, 'PUBLISHED')}
                            className="flex-1"
                        >
                            {loading ? 'Publishing...' : 'Publish Job'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
