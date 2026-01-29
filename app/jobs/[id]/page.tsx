import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ImageGallery } from '@/components/jobs/ImageGallery'
import { ApplicationForm } from '@/components/jobs/ApplicationForm'

export default async function JobDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const job = await prisma.opportunity.findUnique({
        where: { id: params.id },
    })

    if (!job) {
        notFound()
    }

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/jobs" className="inline-flex items-center gap-2 text-accent-navy hover:underline mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <ImageGallery images={job.images} title={job.title} />

                        {/* Job Header */}
                        <div className="mt-8">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="heading-secondary mb-2">{job.title}</h1>
                                    <div className="flex flex-wrap gap-4 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            <span>{job.location}</span>
                                        </div>
                                        {/* Salary removed from here, moved to right */}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            <span>Posted {job.created_at.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-accent-navy text-nowrap">
                                        $ {job.salary}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        / month
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">About the Role</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                                    {job.description}
                                </div>
                            </section>

                            {/* Requirements */}
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                                    {job.requirements}
                                </div>
                            </section>

                            {/* Benefits */}
                            <section className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                                    {job.benefits}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar - Application Form */}
                    <div className="lg:col-span-1">
                        <ApplicationForm jobId={job.id} jobTitle={job.title} />
                    </div>
                </div>
            </div>
        </div>
    )
}
