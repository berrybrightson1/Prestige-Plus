import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
    email: z.string().email(),
    search_query: z.string().optional(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, search_query } = subscribeSchema.parse(body)

        // Upsert subscriber based on email
        // If exists, update the search query (or just leave it)
        // For simplicity, we'll just create or update the existing user's preference
        const subscriber = await prisma.subscriber.upsert({
            where: { email },
            update: { search_query },
            create: { email, search_query },
        })

        return NextResponse.json({ success: true, subscriber })
    } catch (error) {
        console.error('Subscription error:', error)
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}
