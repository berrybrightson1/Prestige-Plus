import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const bucket = formData.get('bucket') as string;

        if (!file || !bucket) {
            return NextResponse.json(
                { error: 'File and bucket are required' },
                { status: 400 }
            );
        }

        // Validate bucket
        const allowedBuckets = ['job-images', 'cvs'];
        if (!allowedBuckets.includes(bucket)) {
            return NextResponse.json(
                { error: 'Invalid bucket' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
        const path = `${timestamp}-${cleanName}`;

        // Upload file
        const buffer = await file.arrayBuffer();
        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(path);

        return NextResponse.json({ url: publicUrl });

    } catch (error) {
        console.error('Upload handler error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
