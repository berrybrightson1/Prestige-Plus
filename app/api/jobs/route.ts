import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const statusParam = searchParams.get('status');
        const query = searchParams.get('q');

        const where: any = {};

        // Filter by status if provided, otherwise default to strict filtering could be applied
        // For now, let's return all if no filter, or filter by specific status
        // Filter by status if provided
        // Use a safer check in case Status enum is not properly loaded at runtime
        if (statusParam) {
            // Check if it's a valid status string manually or via enum if available
            const validStatuses = ['DRAFT', 'PUBLISHED', 'FILLED'];
            if (validStatuses.includes(statusParam)) {
                where.status = statusParam;
            }
        }

        // Search functionality
        if (query) {
            where.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ];
        }

        const jobs = await prisma.opportunity.findMany({
            where,
            orderBy: { created_at: 'desc' },
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.title || !body.description || !body.location) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const job = await prisma.opportunity.create({
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                country: body.country,
                salary: body.salary,
                requirements: body.requirements,
                benefits: body.benefits,
                status: body.status || 'DRAFT',
                company_logo: body.company_logo,
                category: body.category || 'Hospitality',
                images: body.images || [],
            },
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        console.error('Error creating job:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create job' },
            { status: 500 }
        );
    }
}
