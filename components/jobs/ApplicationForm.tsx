'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useCommandPill } from '@/components/ui/CommandPill'
import { Upload } from 'lucide-react'

interface ApplicationFormProps {
    jobId: string
    jobTitle: string
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
    const { showNotification } = useCommandPill()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        candidate_name: '',
        email: '',
        message: '',
    })
    const [cvFile, setCvFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!cvFile) {
                showNotification('Please upload your CV', 'error')
                setLoading(false)
                return
            }

            // 1. Upload CV
            const uploadData = new FormData()
            uploadData.append('file', cvFile)
            uploadData.append('bucket', 'cvs')

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            })

            if (!uploadRes.ok) throw new Error('CV Upload failed')

            const { url: cvUrl } = await uploadRes.json()

            // 2. Submit Application
            const appRes = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    job_id: jobId,
                    candidate_name: formData.candidate_name,
                    email: formData.email,
                    message: formData.message,
                    cv_url: cvUrl,
                }),
            })

            if (!appRes.ok) throw new Error('Application submission failed')

            showNotification('Application submitted successfully!', 'success')

            // Reset form
            setFormData({ candidate_name: '', email: '', message: '' })
            setCvFile(null)
        } catch (error) {
            console.error('Submission error:', error)
            showNotification('Failed to submit application. Please try again.', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="floating-card sticky top-24">
            <h3 className="text-2xl font-semibold mb-6">Apply Now</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    value={formData.candidate_name}
                    onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                    placeholder="John Doe"
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                />

                <Textarea
                    label="Cover Message (Optional)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                />

                {/* CV Upload */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Upload CV/Resume
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id="cv-upload"
                            required
                        />
                        <label
                            htmlFor="cv-upload"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base rounded-xl border-2 border-cream-300 bg-white text-foreground cursor-pointer hover:bg-cream-50 transition-all"
                        >
                            <Upload className="h-5 w-5" />
                            <span>{cvFile ? cvFile.name : 'Choose file...'}</span>
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    By applying, you agree to our terms and privacy policy
                </p>
            </form>
        </div>
    )
}
