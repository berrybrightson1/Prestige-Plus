'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Briefcase, Plane, GraduationCap, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export function AboutSection() {
    return (
        <section className="py-12 lg:py-24 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
            {/* Background Decoration - Hidden on mobile for minimalism */}
            <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 blur-[120px] rounded-l-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center justify-center px-3 py-1 bg-accent-navy/5 rounded-full mb-4">
                            <span className="text-accent-navy font-semibold text-xs uppercase tracking-wider">
                                Who We Are
                            </span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                            Prestige Plus <br className="block" />
                            <span className="text-accent-gold">Recruitment UK</span>
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                            <p className="text-base lg:text-lg">
                                Prestige Plus Recruitment UK is a trusted recruitment and career development brand committed to connecting talented individuals with the right opportunities.
                            </p>
                            <p className="text-base lg:text-lg hidden sm:block">
                                Rooted in professionalism and driven by a passion for empowerment, we specialize in guiding job seekers through every stage of their career journey — from CV preparation to interview success.
                            </p>
                        </div>

                        <Link href="/contact" className="hidden lg:inline-block">
                            <Button size="lg" variant="primary" className="shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/40 transition-shadow">
                                Start Your Journey
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Right Column: Feature Grid (Services) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                        {/* Recruitment */}
                        <Card variant="floating" className="p-4 lg:p-6 bg-white border border-gray-100 hover:border-gray-200">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3 lg:mb-4 text-blue-600">
                                <Briefcase className="h-5 w-5 lg:h-6 lg:w-6" />
                            </div>
                            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Recruitment</h3>
                            <p className="text-xs lg:text-sm text-gray-600 leading-snug">
                                Tailored opportunities across industries for the perfect fit.
                            </p>
                        </Card>

                        {/* Travel */}
                        <Card variant="floating" className="p-4 lg:p-6 bg-accent-navy text-white lg:translate-y-12 transform hover:translate-y-0 lg:hover:translate-y-10 transition-transform duration-300">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 lg:mb-4 text-accent-gold">
                                <Plane className="h-5 w-5 lg:h-6 lg:w-6" />
                            </div>
                            <h3 className="text-base lg:text-lg font-bold mb-1 lg:mb-2">Travel</h3>
                            <p className="text-xs lg:text-sm text-white/80 leading-snug">
                                Consulting for international opportunities and relocation.
                            </p>
                        </Card>

                        {/* Coaching */}
                        <Card variant="floating" className="p-4 lg:p-6 bg-white border border-gray-100 hover:border-gray-200">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-purple-50 flex items-center justify-center mb-3 lg:mb-4 text-purple-600">
                                <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6" />
                            </div>
                            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Coaching</h3>
                            <p className="text-xs lg:text-sm text-gray-600 leading-snug">
                                Expert guidance on CVs and interview preparation.
                            </p>
                        </Card>

                        {/* Motivation */}
                        <Card variant="floating" className="p-4 lg:p-6 bg-cream-100 lg:translate-y-12 transform hover:translate-y-0 lg:hover:translate-y-10 transition-transform duration-300">
                            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-accent-navy/10 flex items-center justify-center mb-3 lg:mb-4 text-accent-navy">
                                <Sparkles className="h-5 w-5 lg:h-6 lg:w-6" />
                            </div>
                            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2">Guidance</h3>
                            <p className="text-xs lg:text-sm text-gray-600 leading-snug">
                                Motivational strategies to thrive in your career.
                            </p>
                        </Card>
                    </div>

                    {/* Mobile Only CTA */}
                    <div className="lg:hidden text-center mt-8">
                        <Link href="/contact" className="inline-block w-full sm:w-auto">
                            <Button size="lg" variant="primary" className="w-full shadow-lg shadow-accent-gold/20">
                                Start Your Journey
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
