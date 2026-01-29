const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Simple env parser
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envFile.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                let value = match[2].trim();
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                env[match[1].trim()] = value;
            }
        });
        return env;
    } catch (e) {
        console.error('Could not read .env file');
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createBucket(name, isPublic = true) {
    console.log(`Checking bucket: ${name}...`);
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error(`Error listing buckets: ${listError.message}`);
        return;
    }

    const existing = buckets.find(b => b.name === name);
    if (existing) {
        console.log(`Bucket '${name}' already exists.`);
        return;
    }

    console.log(`Creating bucket '${name}'...`);
    const { data, error } = await supabase.storage.createBucket(name, {
        public: isPublic,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: name === 'job-images' ? ['image/*'] : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    });

    if (error) {
        console.error(`Error creating bucket '${name}': ${error.message}`);
    } else {
        console.log(`Bucket '${name}' created successfully.`);
    }
}

async function main() {
    await createBucket('job-images', true);
    await createBucket('cvs', false); // CVs should potentially be private?, assuming public for now for simplicity of access or signed URLs? 
    // For recruitment, maybe private. But for this MVP let's make CVs private (false) and we'll need to sign URLs.
    // Actually, the app might expect public URLs for simplicity if I used `getPublicUrl`.
    // Let's check the code: `cv_url` is just a string.
    // If I make it private, I need to implement signed URLs.
    // For MVP/Demo, let's make it public OR implementation plan said "download links".
    // I'll make it public for now to ensure it works easily, or check implementation.
    // Implementation Plan said "Supabase Buckets (Job images and CV uploads)".
    // I'll stick to public for now to avoid permission issues during verification, 
    // but warn user to change later.
}

main();
