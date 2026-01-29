import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { getFlagUrl } from '@/lib/countries'

interface OpportunityCardProps {
    id: string
    title: string
    location: string
    salary: string
    country?: string
    company_logo: string
    images: string[]
    description: string
    benefits?: string
    href?: string
}

export function OpportunityCard({ id, title, location, salary, country, images, benefits, description, href }: OpportunityCardProps) {
    const mainImage = images[0] || '/placeholder-job.jpg'
    const flagUrl = country ? getFlagUrl(country) : null

    return (
        <Link href={href || `/jobs/${id}`}>
            <Card variant="soft" className="hover:shadow-float transition-all cursor-pointer h-full flex flex-col group">
                {/* Image */}
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                    <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-1">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{location}</span>
                    </div>

                    <div className="mb-4 flex-1">
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {benefits || description}
                        </p>
                    </div>

                    {/* Footer - Action & Price */}
                    <div className="mt-auto pt-4 border-t border-cream-300 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-cream-200 flex items-center justify-center text-accent-navy group-hover:bg-accent-navy group-hover:text-white transition-colors duration-300">
                                <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                            {flagUrl && flagUrl !== '' && (
                                <div className="relative w-8 h-6 rounded overflow-hidden shadow-sm shrink-0">
                                    <Image
                                        src={flagUrl}
                                        alt={`Flag of ${country}`}
                                        fill
                                        className="object-cover"
                                        unoptimized // Added to avoid Vercel image optimization issues with external URLs sometimes
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-2xl font-bold text-accent-navy">
                            {salary.startsWith('£') || salary.startsWith('$') ? salary : `$${salary.replace(/^[^0-9]+/, '')}`}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
