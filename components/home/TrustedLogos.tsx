import Image from 'next/image'

const logos = [
    { name: 'Hilton', src: '/logos/hilton.png' },
    { name: 'Marriott', src: '/logos/marriott.png' },
    { name: 'Four Seasons', src: '/logos/fourseasons.png' },
    { name: 'Hyatt', src: '/logos/hyatt.png' },
    { name: 'Accor', src: '/logos/accor.png' },
    { name: 'IHG', src: '/logos/ihg.png' },
]

export function TrustedLogos() {
    return (
        <section className="py-12 bg-cream-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h3 className="text-center text-sm font-semibold text-gray-600 uppercase tracking-wide mb-8">
                    Trusted by Leading Hospitality Brands
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    {logos.map((logo) => (
                        <div
                            key={logo.name}
                            className="relative h-12 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
