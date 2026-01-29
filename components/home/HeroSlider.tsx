'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
    {
        title: 'Work. Travel. Thrive.',
        subtitle: 'Discover exciting opportunities around the world',
        cta: 'Explore Jobs',
        image: '/hero-1.jpg',
    },
    {
        title: 'Your Next Adventure Awaits',
        subtitle: 'Join luxury resorts and hospitality teams globally',
        cta: 'Browse Opportunities',
        image: '/hero-2.jpg',
    },
    {
        title: 'Build Your Career Abroad',
        subtitle: 'Competitive salaries, travel perks, and housing included',
        cta: 'Get Started',
        image: '/hero-3.jpg',
    },
]

export function HeroSlider() {
    return (
        <div className="relative h-[500px] md:h-[700px] -mt-16">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !bg-white/50',
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
                }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                                }}
                            />

                            {/* Content */}
                            <div className="relative h-full flex items-center justify-center text-center px-4">
                                <div className="max-w-4xl pt-16 md:pt-0">
                                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 lg:mb-6 leading-[1.1]">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-lg mx-auto">
                                        {slide.subtitle}
                                    </p>
                                    <Link href="/jobs">
                                        <Button size="lg" variant="secondary">
                                            {slide.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Operations Indicator - Absolute Bottom */}
                            <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10">
                                <div className="inline-flex items-center gap-3 bg-accent-navy/90 backdrop-blur-sm py-1.5 px-4 rounded-full border border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                    <div className="flex -space-x-2">
                                        <img
                                            src="https://flagcdn.com/w40/gh.png"
                                            alt="Ghana"
                                            className="w-6 h-6 rounded-full border-[1.5px] border-accent-navy object-cover"
                                        />
                                        <img
                                            src="https://flagcdn.com/w40/us.png"
                                            alt="USA"
                                            className="w-6 h-6 rounded-full border-[1.5px] border-accent-navy object-cover"
                                        />
                                        <img
                                            src="https://flagcdn.com/w40/cn.png"
                                            alt="China"
                                            className="w-6 h-6 rounded-full border-[1.5px] border-accent-navy object-cover"
                                        />
                                        <div className="w-6 h-6 rounded-full border-[1.5px] border-accent-navy bg-gray-700 flex items-center justify-center text-[9px] text-white font-bold">
                                            +
                                        </div>
                                    </div>
                                    <span className="text-white font-medium text-xs">
                                        10+ Countries Operations
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
