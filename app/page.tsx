import { HeroSlider } from '@/components/home/HeroSlider'
import { TrustedLogos } from '@/components/home/TrustedLogos'
import { SuccessMetrics } from '@/components/home/SuccessMetrics'
import { Testimonials } from '@/components/home/Testimonials'
import { AboutSection } from '@/components/home/AboutSection'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
    return (
        <>
            <HeroSlider />
            <AboutSection />
            <SuccessMetrics />

            {/* CTA Section */}
            <section className="py-10 lg:py-20 bg-accent-navy text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-base lg:text-xl text-white/90 mb-6 lg:mb-8">
                        Browse our latest opportunities and apply today
                    </p>
                    <Link href="/jobs">
                        <Button size="lg" variant="secondary">
                            View All Jobs
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Testimonials />
            <TrustedLogos />
        </>
    )
}
