import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase Environment Variables!')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testUpload() {
    console.log('Testing upload to "job-images" bucket...')

    const fileName = `test-upload-${Date.now()}.png`
    // 1x1 pixel PNG base64 string
    const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKwJQAAAAABJRU5ErkJggg=='
    const fileContent = Buffer.from(base64Data, 'base64')

    const { data, error } = await supabase.storage
        .from('job-images')
        .upload(fileName, fileContent, {
            contentType: 'image/png',
            upsert: true
        })

    if (error) {
        console.error('❌ Upload Failed:', error.message)
        console.error('Full Error:', error)
    } else {
        console.log('✅ Upload Successful!')
        console.log('Path:', data.path)

        const { data: { publicUrl } } = supabase.storage
            .from('job-images')
            .getPublicUrl(data.path)

        console.log('Public URL:', publicUrl)
    }
}

testUpload()
