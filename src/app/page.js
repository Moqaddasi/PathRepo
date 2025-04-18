import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="bg-black text-white">
            {/* Hero Section */}
            <section className="h-1/3 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-center p-6">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Everything you need to know about <br /> <span className="text-yellow-400">Software Architecture Patterns</span>.
                    </h1>
                    {/* <div className="flex justify-center gap-4">
                        <Link href='archMenu' >Arch</Link>
                        <Link href='repoFileExplorer' variant="outline">Repo File Explorer</Link>
                    </div> */}
                </div>
            </section>

            {/* Value Proposition */}
            {/* Value Proposition */}
            <section className="py-16 bg-gray-50 text-black text-center">
                <h4 className="text-sm text-blue-500 font-bold mb-2">BEYOND SOLUTIONS</h4>
                <h2 className="text-3xl font-bold mb-6">Building Partnerships, Not Just Solutions</h2>

                <p className="max-w-3xl mx-auto text-lg mb-10">
                    At the heart of this project lies a commitment to more than just writing code — it&apos;s about creating a shared understanding of robust, scalable software systems. We believe in a collaborative approach that adapts to real-world challenges, offering tailored architecture solutions that evolve with your needs. This isn&apos;t a one-time delivery — it&apos;s a long-term partnership focused on building future-proof systems and mutual success. Together, we transform complexity into clarity and ideas into impact.
                </p>

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
                        <h3 className="text-3xl font-bold mb-4">Transform Applications with Scalable Architecture</h3>
                        <p className="text-lg mb-4">
                            Unlock the full potential of your software by adopting architectural patterns that support adaptability, performance, and long-term scalability.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-base text-left">
                            <li>Design with future-proof technologies and patterns</li>
                            <li>Integrate seamlessly with existing systems and services</li>
                            <li>Ensure performance under pressure with optimized flows</li>
                            <li>Build scalable solutions that grow with your needs</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Consulting Section */}
            <section className="py-16 bg-yellow-50 text-black">
                <div className="grid md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto px-6">
                    <div>
                        <h4 className="text-sm text-blue-500 font-bold mb-2">SEAMLESS INTEGRATION</h4>
                        <h3 className="text-3xl font-bold mb-4">Expert Consulting for Scalable Growth</h3>
                        <p className="text-lg mb-4">
                            Empower your software journey with strategic guidance tailored to your architecture, processes, and goals. From initial planning to continuous improvement — we’ve got you covered.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-base">
                            <li>In-depth architecture analysis and strategic insights</li>
                            <li>Solutions customized for your business context</li>
                            <li>Optimization for operational excellence</li>
                            <li>Ongoing support to evolve as you grow</li>
                        </ul>
                    </div>
                    <Image src="/images/female-smile.png" alt="Consulting" width={400} height={400} />
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-black text-white py-12 px-6 text-center">
                <p className="text-sm">&copy; 2025 Moq. All rights reserved.</p>
            </footer>
        </main>
    );
}
