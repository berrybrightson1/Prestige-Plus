import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                    src="/contact-hero.png"
                    alt="Prestige Plus Office"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-accent-navy/80 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-base md:text-xl text-cream-100 max-w-2xl mx-auto font-light">
                            We're here to help you find your perfect work-travel opportunity.
                            <br className="hidden md:block" />
                            Reach out to us anytime.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Phone & WhatsApp - Prominent */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-cream-100 h-full">
                            <h2 className="text-xl md:text-2xl font-bold text-accent-navy mb-6">Direct Contact</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* WhatsApp Card */}
                                <div className="bg-[#E7FCEB] p-6 rounded-xl border border-green-200 hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-[#25D366] text-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                            <MessageCircle className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-green-900">WhatsApp</h3>
                                    </div>
                                    <p className="text-green-800 mb-6 text-sm">
                                        Fastest response time. Chat with our recruitment team instantly.
                                    </p>
                                    <a
                                        href="https://wa.me/447496255692"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <button className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                                            <MessageCircle className="h-5 w-5" />
                                            Chat Now
                                        </button>
                                    </a>
                                </div>

                                {/* Phone Card */}
                                <div className="bg-cream-50 p-6 rounded-xl border border-cream-200 hover:shadow-md transition-all group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-accent-navy text-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-accent-navy">Call Us</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Speak directly with un. Available Mon-Fri, 9am - 6pm.
                                    </p>
                                    <div className="space-y-3">
                                        <a href="tel:+447496255692" className="flex items-center gap-2 text-accent-navy font-medium hover:underline">
                                            <span>+44 7496 255692</span>
                                        </a>
                                        <a href="tel:+447424958971" className="flex items-center gap-2 text-accent-navy font-medium hover:underline">
                                            <span>+44 7424 958971</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-cream-100">
                                <h3 className="font-semibold text-lg text-accent-navy mb-4">Email</h3>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-cream-200">
                                    <div className="p-2 bg-cream-100 rounded-lg text-accent-navy">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <a
                                        href="mailto:Info@prestigeplusrecruits.com"
                                        className="text-lg text-gray-700 hover:text-accent-navy transition-colors break-all"
                                    >
                                        Info@prestigeplusrecruits.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / quick actions */}
                    <div className="space-y-6">
                        <div className="bg-accent-navy text-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Send className="h-32 w-32" />
                            </div>
                            <h2 className="text-xl font-bold mb-4">Job Seekers?</h2>
                            <p className="text-cream-200 mb-6 relative z-10">
                                Don't wait! Browse our latest international opportunities and apply today.
                            </p>
                            <Link href="/jobs">
                                <Button className="w-full bg-accent-gold text-accent-navy hover:bg-white hover:text-accent-navy border-none font-bold">
                                    Browse Jobs
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-cream-100">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-accent-gold" />
                                Location
                            </h3>
                            <p className="text-gray-600">
                                United Kingdom
                                <br />
                                <span className="text-sm text-gray-400">Serving Global Clients</span>
                            </p>
                        </div>

                        {/* Socials */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-cream-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                <a
                                    href="https://instagram.com/PrestigePlusRecruitment"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 p-3 rounded-lg bg-cream-50 text-accent-navy hover:bg-pink-600 hover:text-white transition-all flex justify-center items-center group"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </a>
                                <a
                                    href="https://twitter.com/PrestigePlusRecruitment"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 p-3 rounded-lg bg-cream-50 text-accent-navy hover:bg-blue-400 hover:text-white transition-all flex justify-center items-center group"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </a>
                                <a
                                    href="https://facebook.com/PrestigePlusRecruitment"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 p-3 rounded-lg bg-cream-50 text-accent-navy hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center group"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
