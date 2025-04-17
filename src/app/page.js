import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="bg-black text-white">
            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-center p-6">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Empowering Your Growth With Future <span className="text-yellow-400">Technology</span>.
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Explore our dynamic solutions to enhance performance, scalability, and innovation. Let us drive your success.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href='archMenu' >Arch</Link>
                        <Link href='repoFileExplorer' variant="outline">Repo File Explorer</Link>
                    </div>
                </div>
            </section>

            {/* Trusted Section */}
            <section className="bg-white text-black py-12 text-center">
                <h2 className="text-sm text-yellow-500 font-bold mb-2">AROUND THE GLOBE</h2>
                <h3 className="text-2xl font-semibold mb-6">Trusted by Industry Leaders</h3>
                <div className="flex justify-center gap-8 grayscale">
                    <Image src="/brands/amd.png" alt="AMD" width={80} height={40} />
                    <Image src="/brands/bing.png" alt="Bing" width={80} height={40} />
                    {/* Add more logos as needed */}
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-16 bg-gray-50 text-black text-center">
                <h4 className="text-sm text-blue-500 font-bold mb-2">BEYOND SOLUTIONS</h4>
                <h2 className="text-3xl font-bold mb-6">Building Partnerships, Not Just Solutions</h2>
                <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {['Collaborative Approach', 'Tailored Solutions', 'Long-Term Commitment', 'Shared Success'].map(text => (
                        <div key={text} className="bg-white shadow-md p-4 rounded-xl">
                            <p className="font-semibold">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white text-black">
                <div className="grid md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto px-6">
                    <Image src="/images/professional.png" alt="Professional" width={400} height={400} />
                    <div>
                        <h4 className="text-sm text-yellow-500 font-bold mb-2">FUTURE-READY</h4>
                        <h3 className="text-3xl font-bold mb-4">Transform Applications</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Future-Ready Solutions</li>
                            <li>Seamless Integration</li>
                            <li>Optimized Performance</li>
                            <li>Scalable Growth</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Consulting Section */}
            <section className="py-16 bg-yellow-50 text-black">
                <div className="grid md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto px-6">
                    <div>
                        <h4 className="text-sm text-blue-500 font-bold mb-2">SEAMLESS INTEGRATION</h4>
                        <h3 className="text-3xl font-bold mb-4">Consulting for Seamless Growth</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Strategic Insights</li>
                            <li>Tailored Solutions</li>
                            <li>Operational Excellence</li>
                            <li>Continuous Support</li>
                        </ul>
                    </div>
                    <Image src="/images/female-smile.png" alt="Consulting" width={400} height={400} />
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 bg-white text-center">
                <h4 className="text-sm text-yellow-500 font-bold mb-2">OUR PRODUCTS</h4>
                <h3 className="text-3xl font-bold mb-8">Designed for Tomorrow’s Digital Transformation</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {['CRM Software', 'ERP Software'].map(product => (
                        <div key={product} className="bg-gray-100 p-6 rounded-xl shadow">
                            <h4 className="text-xl font-semibold mb-2">{product}</h4>
                            <p className="text-sm text-gray-700">High-performance software to manage and scale operations efficiently.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-900 text-white text-center">
                <h4 className="text-sm text-blue-500 font-bold mb-2">OUR SERVICES</h4>
                <h3 className="text-3xl font-bold mb-8">Innovative Solutions for Your Business</h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {['Empower with Digital Transformation', 'Revolutionizing Healthcare'].map(service => (
                        <div key={service} className="bg-gray-800 p-6 rounded-xl">
                            <h4 className="text-xl font-semibold mb-2">{service}</h4>
                            <p className="text-sm">We deliver innovative, reliable, and scalable technology solutions tailored to your business.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white text-black text-center">
                <h3 className="text-3xl font-bold mb-6">Our Customer Success Stories</h3>
                <div className="max-w-2xl mx-auto">
                    <p className="italic mb-4">“Empower businesses with innovative IT solutions that create lasting value. Their expertise in deep alignment, modern strategy, and cloud migration has driven results across our enterprise.”</p>
                    <p className="font-semibold">- John Doe, CTO at Success Inc.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 px-6 text-center">
                <p>&copy; 2025 X Tech. All rights reserved.</p>
            </footer>
        </main>
    );
}
