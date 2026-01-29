'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'

import 'swiper/css'
import 'swiper/css/navigation'

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Resort Chef',
        location: 'Maldives',
        rating: 5,
        text: 'Prestige Plus helped me land my dream job at a luxury resort in the Maldives. The entire process was smooth, and they supported me every step of the way!',
    },
    {
        name: 'Michael Chen',
        role: 'Hotel Manager',
        location: 'Dubai',
        rating: 5,
        text: 'I never thought working abroad could be this easy. The team at Prestige Plus made everything seamless, from application to relocation.',
    },
    {
        name: 'Emma Williams',
        role: 'Spa Therapist',
        location: 'Bali',
        rating: 5,
        text: 'Amazing experience! Not only did I get a great job, but the benefits package including housing and flights exceeded my expectations.',
    },
    {
        name: 'David Martinez',
        role: 'Executive Chef',
        location: 'Switzerland',
        rating: 5,
        text: 'Professional, reliable, and truly care about matching you with the right opportunity. Highly recommend Prestige Plus!',
    },
]

export function Testimonials() {
    return (
        <section className="py-10 lg:py-20 bg-gray-50/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-6">
                    <div>
                        <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">What Our Candidates Say</h2>
                        <p className="text-base lg:text-lg text-gray-600 max-w-xl">
                            Real stories from professionals who found their next adventure with us.
                        </p>
                    </div>

                    {/* Custom Nav Buttons - Desktop */}
                    <div className="hidden md:flex gap-4">
                        <button
                            aria-label="Previous testimonial"
                            className="swiper-prev-custom w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 transition-all hover:border-accent-navy hover:text-accent-navy hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            aria-label="Next testimonial"
                            className="swiper-next-custom w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 transition-all hover:border-accent-navy hover:text-accent-navy hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={32}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-prev-custom',
                            nextEl: '.swiper-next-custom',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="!pb-10"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-full p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <Quote className="h-10 w-10 text-accent-gold/20 mb-6" />

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-accent-gold text-accent-gold" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    <div className="mt-auto border-t border-gray-100 pt-6">
                                        <div className="font-bold text-gray-900 text-lg">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-accent-navy font-medium">
                                            {testimonial.role} • {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Mobile Only Nav (Centered below) */}
                    <div className="flex md:hidden justify-center gap-4 mt-6">
                        <button
                            aria-label="Previous testimonial"
                            className="swiper-prev-custom w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 active:bg-gray-50"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            aria-label="Next testimonial"
                            className="swiper-next-custom w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 active:bg-gray-50"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
