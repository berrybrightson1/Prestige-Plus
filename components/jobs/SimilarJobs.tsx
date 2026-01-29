import { prisma } from '@/lib/prisma'
import { OpportunityCard } from '@/components/jobs/OpportunityCard'

interface SimilarJobsProps {
    currentJobId: string
    category: string
}

export async function SimilarJobs({ currentJobId, category }: SimilarJobsProps) {
    const similarJobs = await prisma.opportunity.findMany({
        where: {
            category: category,
            id: { not: currentJobId },
            status: 'PUBLISHED',
        },
        take: 3,
        orderBy: { created_at: 'desc' },
    })

    if (similarJobs.length === 0) return null

    return (
        <section className="mt-16 border-t border-cream-300 pt-12">
            <h2 className="heading-secondary mb-8">Similar Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((job) => (
                    <OpportunityCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        location={job.location}
                        country={job.country}
                        salary={job.salary}
                        company_logo={job.company_logo}
                        images={job.images}
                        description={job.description}
                        benefits={job.benefits}
                    />
                ))}
            </div>
        </section>
    )
}
