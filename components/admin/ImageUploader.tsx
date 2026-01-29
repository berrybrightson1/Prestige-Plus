'use client'

import { useState } from 'react'
import { Upload, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface ImageUploaderProps {
    images: string[]
    onImagesChange: (images: string[]) => void
    maxImages?: number
}

import { compressImage } from '@/lib/image-utils'

// ... imports ...

// ... props definition ...

export function ImageUploader({ images, onImagesChange, maxImages = 5 }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false)

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        if (images.length + files.length > maxImages) {
            alert(`Maximum ${maxImages} images allowed`)
            return
        }

        setUploading(true)

        try {
            const uploadedUrls: string[] = []

            for (const file of files) {
                // Compress image before upload
                const compressedFile = await compressImage(file, 130) // 130KB target

                const formData = new FormData()
                formData.append('file', compressedFile)
                formData.append('bucket', 'job-images')

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!res.ok) throw new Error('Upload failed')

                const data = await res.json()
                uploadedUrls.push(data.url)
            }

            onImagesChange([...images, ...uploadedUrls])
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed to upload one or more images')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">
                Job Images (Max {maxImages})
            </label>

            {/* Upload Button */}
            {images.length < maxImages && (
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="inline-flex items-center gap-2 px-4 py-3 text-base rounded-xl border-2 border-cream-300 bg-white text-foreground cursor-pointer hover:bg-cream-50 transition-all"
                    >
                        <Upload className="h-5 w-5" />
                        <Plus className="h-4 w-4 -ml-2" />
                        <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
                    </label>
                </div>
            )}

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <div className="relative h-32 w-full rounded-lg overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                                title="Remove image"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
