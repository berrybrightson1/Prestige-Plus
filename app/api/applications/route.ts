import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validation
        if (!body.job_id || !body.candidate_name || !body.email || !body.cv_url) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const application = await prisma.application.create({
            data: {
                job_id: body.job_id,
                candidate_name: body.candidate_name,
                email: body.email,
                cv_url: body.cv_url,
                message: body.message,
            },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                opportunity: {
                    select: { title: true }
                }
            }
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications' },
            { status: 500 }
        );
    }
}
