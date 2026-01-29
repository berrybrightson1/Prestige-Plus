'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
    images: string[]
    title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <>
            {/* Main Image */}
            <div className="relative">
                <div
                    className="relative h-96 w-full rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setLightboxOpen(true)}
                >
                    <Image
                        src={images[selectedIndex]}
                        alt={`${title} - Image ${selectedIndex + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${index === selectedIndex ? 'border-accent-navy' : 'border-transparent'
                                }`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                        aria-label="Close lightbox"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
                        <Image
                            src={images[selectedIndex]}
                            alt={`${title} - Image ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
