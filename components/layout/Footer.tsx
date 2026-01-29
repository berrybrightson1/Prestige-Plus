import Link from 'next/link'
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-accent-navy text-white mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Prestige Plus Recruitment</h3>
                        <p className="text-cream-100 text-sm">
                            Your gateway to exciting work-travel opportunities around the globe.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href="tel:+447496255692" className="text-sm hover:text-accent-gold transition-colors">
                                    +44 7496 255692
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href="tel:+447424958971" className="text-sm hover:text-accent-gold transition-colors">
                                    +44 7424 958971
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
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
                                className="p-2 rounded-lg bg-white/10 hover:bg-accent-gold transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/PrestigePlusRecruitment"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-accent-gold transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://facebook.com/PrestigePlusRecruitment"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-accent-gold transition-colors"
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
