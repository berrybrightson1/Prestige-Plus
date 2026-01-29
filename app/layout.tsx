import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
    subsets: ["latin"],
    variable: "--font-hanken",
    display: "swap",
});

import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPillProvider } from "@/components/ui/CommandPill";

export const metadata: Metadata = {
    title: "Prestige Plus Recruitment UK | Global Work-Travel Opportunities",
    description: "Find exciting work-travel opportunities around the globe with Prestige Plus Recruitment UK. Explore jobs in luxury resorts, hospitality, and more.",
    keywords: "work travel, recruitment, jobs abroad, international jobs, travel jobs, UK recruitment",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${hanken.variable} antialiased font-sans`}>
                <CommandPillProvider>
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </CommandPillProvider>
            </body>
        </html>
    );
}
