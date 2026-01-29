import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Attempting to create job...')
    try {
        const job = await prisma.opportunity.create({
            data: {
                title: 'Debug Job',
                description: 'This is a debug job to test database connectivity and schema.',
                location: 'Debug Location',
                country: 'United Kingdom',
                salary: '50000',
                category: 'Hospitality',
                status: 'DRAFT',
                company_logo: '/placeholder.png',
                images: [],
                requirements: 'Debug Requirements',
                benefits: 'Debug Benefits',
            },
        })
        console.log('Job created successfully:', job.id)
    } catch (e: any) {
        console.error('CRITICAL ERROR creating job:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
