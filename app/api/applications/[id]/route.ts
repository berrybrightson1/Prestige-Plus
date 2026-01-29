import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
    params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const body = await req.json()
        const { status } = body

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            )
        }

        const application = await prisma.application.update({
            where: { id },
            data: { status },
        })

        return NextResponse.json(application)
    } catch (error) {
        console.error('Error updating application:', error)
        return NextResponse.json(
            { error: 'Failed to update application' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const { id } = await params

        await prisma.application.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting application:', error)
        return NextResponse.json(
            { error: 'Failed to delete application' },
            { status: 500 }
        )
    }
}
