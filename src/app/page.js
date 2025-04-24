import Image from 'next/image';
import cyberHandImage from '../../assets/cyberHand.png';

export default function Home() {
    return (
        <main className="bg-black text-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-center px-4 py-12 sm:py-16 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Everything you need to know about{" "}
                        <span className="text-yellow-400 block mt-2">Software Architecture Patterns</span>
                    </h1>
                    {/* <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <Link href='archMenu' >Arch</Link>
                        <Link href='repoFileExplorer' variant="outline">Repo File Explorer</Link>
                    </div> */}
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-12 sm:py-16 bg-gray-50 text-black text-center px-4">
                <div className="max-w-6xl mx-auto">
                    <h4 className="text-sm text-blue-500 font-bold mb-2">BEYOND SOLUTIONS</h4>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Building Partnerships, Not Just Solutions</h2>

                    <p className="max-w-3xl mx-auto text-base sm:text-lg mb-8 sm:mb-10">
                        At the heart of this project lies a passion for more than just writing code — it&apos;s about gaining a deep understanding of robust, scalable software systems. The focus is on a collaborative learning approach that tackles real-world challenges and explores architecture solutions that adapt and evolve with emerging trends. This isn&apos;t just about theory — it&apos;s about fostering long-term growth, sharing knowledge, and continuously evolving. Together, we transform complexity into clarity and ideas into actionable insights.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                        {['Collaborative Approach', 'Tailored Solutions', 'Long-Term Commitment', 'Shared Success'].map(text => (
                            <div key={text} className="bg-white shadow-md p-4 rounded-xl">
                                <p className="font-semibold">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 bg-white text-black">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="flex justify-center md:justify-start">
                            <Image
                                src={cyberHandImage}
                                alt="Professional"
                                width={400}
                                height={400}
                                className="w-full max-w-sm md:max-w-md object-contain"
                                priority
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-sm text-yellow-500 font-bold mb-2">FUTURE-READY</h4>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Exploring Scalable Architecture for the Future</h3>
                            <p className="text-base sm:text-lg mb-4">
                                Unlock the full potential of your software by learning and experimenting with architectural patterns that promote adaptability, performance, and long-term scalability.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-left">
                                <li>Explore future-proof technologies and patterns</li>
                                <li>Integrate seamlessly with existing systems and services</li>
                                <li>Optimize flows to ensure performance under pressure</li>
                                <li>Build scalable solutions that grow with your understanding and needs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Architecture Patterns Section */}
            {/* Commented out section preserved but enhanced for responsiveness
            <section className="py-12 sm:py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                        POPULAR PATTERNS
                    </h2>
                    <h3 className="text-lg sm:text-xl text-center text-gray-600 mb-8 sm:mb-10">
                        Industry-Standard Architecture Patterns for Modern Applications
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                title: 'Microservices',
                                description: 'Build applications as a suite of small, independent services that communicate over well-defined APIs.',
                                benefits: ['Scalability', 'Fault Isolation', 'Technology Flexibility']
                            },
                            {
                                title: 'Event-Driven',
                                description: 'Design systems where components react to events, enabling loose coupling and real-time responsiveness.',
                                benefits: ['Asynchronous Processing', 'Decoupling', 'Reactivity']
                            },
                            {
                                title: 'Domain-Driven Design',
                                description: 'Align software architecture with business domains to create more maintainable and meaningful systems.',
                                benefits: ['Business Alignment', 'Bounded Contexts', 'Ubiquitous Language']
                            },
                            {
                                title: 'CQRS',
                                description: 'Command Query Responsibility Segregation separates read and write operations for optimized performance.',
                                benefits: ['Performance Optimization', 'Scalability', 'Simplified Models']
                            },
                            {
                                title: 'Serverless',
                                description: 'Focus on writing code without managing infrastructure, with automatic scaling and pay-per-execution.',
                                benefits: ['Cost Efficiency', 'Auto-scaling', 'Reduced Operations']
                            },
                            {
                                title: 'Hexagonal Architecture',
                                description: 'Isolate business logic from external concerns through ports and adapters for better testability.',
                                benefits: ['Testability', 'Flexibility', 'Domain Focus']
                            },
                        ].map(pattern => (
                            <div key={pattern.title} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">{pattern.title}</h4>
                                    <p className="text-gray-600 mb-4">{pattern.description}</p>
                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pattern.benefits.map(benefit => (
                                                <span key={benefit} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Footer */}
            <footer className="bg-black text-white py-8 sm:py-12 px-4 text-center mt-auto">
                <p className="text-sm">&copy; 2025 Moq. All rights reserved.</p>
            </footer>
        </main>
    );
}