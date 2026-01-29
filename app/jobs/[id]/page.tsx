import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ImageGallery } from '@/components/jobs/ImageGallery'
import { ApplicationForm } from '@/components/jobs/ApplicationForm'
import { SimilarJobs } from '@/components/jobs/SimilarJobs'
import { ViewTracker } from '@/components/jobs/ViewTracker'
import { JobAlert } from '@/components/jobs/JobAlert'
import { Metadata } from 'next'
import { getFlagUrl } from '@/lib/countries'
import Image from 'next/image'
import { MobileApplyButton } from '@/components/jobs/MobileApplyButton'

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const job = await prisma.opportunity.findUnique({
        where: { id },
    })

    if (!job) {
        return {
            title: 'Job Not Found | Prestige Plus',
        }
    }

    const ogImage = job.images[0] || '/placeholder-job.jpg'

    return {
        title: `${job.title} in ${job.location} | Prestige Plus Recruitment`,
        description: `Apply for ${job.title} at Prestige Plus. ${job.description.slice(0, 150)}...`,
        openGraph: {
            title: `${job.title} | Prestige Plus`,
            description: `Salary: ${job.salary}. Location: ${job.location}. Apply now!`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: job.title,
                },
            ],
        },
    }
}

export default async function JobDetailsPage({ params }: Props) {
    const { id } = await params
    const job = await prisma.opportunity.findUnique({
        where: { id },
    })

    if (!job) {
        notFound()
    }

    return (
        <div className="py-6 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/jobs" className="inline-flex items-center gap-2 text-accent-navy hover:underline mb-4 lg:mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 lg:mb-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <ImageGallery images={job.images} title={job.title} />

                        {/* Job Header */}
                        <div className="mt-8">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                    <div className="flex flex-wrap gap-4 text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{job.location}</span>
                                            {job.country && getFlagUrl(job.country) !== '' && (
                                                <div className="relative w-6 h-4 rounded-sm overflow-hidden shadow-sm inline-block ml-1">
                                                    <Image
                                                        src={getFlagUrl(job.country)}
                                                        alt={`Flag of ${job.country}`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">Posted {job.created_at.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:text-right bg-cream-100/50 p-4 rounded-xl border border-cream-200 sm:border-none sm:bg-transparent sm:p-0">
                                    <div className="text-2xl lg:text-3xl font-bold text-accent-navy">
                                        $ {job.salary}
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-500 mt-1 uppercase tracking-wider font-semibold">
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
                    <div className="lg:col-span-1 border-l border-cream-200 lg:pl-8">
                        <div className="hidden lg:block space-y-8">
                            <ApplicationForm jobId={job.id} jobTitle={job.title} />
                            <JobAlert category={job.category} />
                        </div>

                        {/* Mobile view alert only (Form is in button) */}
                        <div className="lg:hidden">
                            <MobileApplyButton jobId={job.id} jobTitle={job.title} />
                            <JobAlert category={job.category} />
                        </div>
                    </div>
                </div>



                {/* Similar Jobs */}
                <SimilarJobs currentJobId={job.id} category={job.category} />
                <ViewTracker jobId={job.id} />
            </div>
        </div>
    )
}
