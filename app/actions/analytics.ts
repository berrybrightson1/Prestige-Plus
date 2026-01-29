'use server'

import { prisma } from '@/lib/prisma'

export async function incrementJobView(jobId: string) {
    if (!jobId) return

    try {
        await prisma.opportunity.update({
            where: { id: jobId },
            data: {
                views: {
                    increment: 1,
                },
            },
        })
    } catch (error) {
        console.error('Failed to increment view count:', error)
    }
}
