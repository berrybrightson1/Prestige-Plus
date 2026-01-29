import Link from 'next/link'
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-accent-navy text-white mt-10 lg:mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Prestige Plus Recruitment</h3>
                        <p className="text-cream-100/80 text-sm leading-relaxed">
                            Your gateway to exciting work-travel opportunities around the globe. Trusted by professionals worldwide.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 group">
                                <div className="p-1.5 rounded-lg bg-white/5 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <a href="tel:+447496255692" className="text-sm hover:text-accent-gold transition-colors">
                                    +44 7496 255692
                                </a>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="p-1.5 rounded-lg bg-white/5 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <a href="tel:+447424958971" className="text-sm hover:text-accent-gold transition-colors">
                                    +44 7424 958971
                                </a>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="p-1.5 rounded-lg bg-white/5 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <a href="mailto:Info@prestigeplusrecruits.com" className="text-sm hover:text-accent-gold transition-colors">
                                    Info@prestigeplusrecruits.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/PrestigePlusRecruitment"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Instagram"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-accent-gold transition-all hover:scale-110"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/PrestigePlusRecruitment"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-accent-gold transition-all hover:scale-110"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://facebook.com/PrestigePlusRecruitment"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Facebook"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-accent-gold transition-all hover:scale-110"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-cream-100">
                    <p>&copy; {new Date().getFullYear()} Prestige Plus Recruitment UK. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
