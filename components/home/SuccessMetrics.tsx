import { Users, Globe, Star } from 'lucide-react'

const metrics = [
    {
        icon: Users,
        value: '2,500+',
        label: 'Candidates Placed',
        description: 'Successfully matched with dream jobs',
    },
    {
        icon: Globe,
        value: '45+',
        label: 'Countries',
        description: 'Opportunities worldwide',
    },
    {
        icon: Star,
        value: '98%',
        label: 'Satisfaction Rate',
        description: 'Happy candidates and employers',
    },
]

export function SuccessMetrics() {
    return (
        <section className="py-12 lg:py-24 bg-white relative overflow-hidden">
            {/* Ultra-subtle background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-50/50 rounded-full blur-3xl -z-10" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 tracking-tight">
                        Our Track Record
                    </h2>
                    <p className="text-base lg:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                        Trusted by thousands of candidates and employers worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon
                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-[2rem] bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="mb-6 p-4 rounded-2xl bg-gray-50 text-accent-navy group-hover:bg-accent-navy group-hover:text-white transition-colors duration-300">
                                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tighter">
                                        {metric.value}
                                    </div>
                                    <div className="text-lg font-medium text-gray-900 mb-2 uppercase tracking-wide">
                                        {metric.label}
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">{metric.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
