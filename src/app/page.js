import Image from 'next/image';
import cyberHandImage from '../../assets/cyberHand.png';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="bg-black text-white px-4 sm:px-6">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-center py-16 px-4 sm:px-6">
                <div className="max-w-3xl">
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                        Everything you need to know about <br />
                        <span className="text-yellow-400">Software Architecture Patterns</span>.
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Link
                            href="archMenu"
                            className="px-6 py-3 rounded-xl border-2 border-yellow-500 text-yellow-500 font-semibold shadow-md hover:bg-yellow-500 hover:text-black transition duration-200"

                        >
                            Architecture
                        </Link>
                        <Link
                            href="repoFileExplorer"
                            className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold shadow-md hover:bg-yellow-400 transition duration-200"

                        >
                            Repository Explorer
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-12 sm:py-16 bg-gray-50 text-black text-center">
                <h4 className="text-xs sm:text-sm text-blue-500 font-bold mb-2">BEYOND SOLUTIONS</h4>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Building Partnerships, Not Just Solutions</h2>

                <p className="max-w-3xl mx-auto text-base sm:text-lg mb-10">
                    At the heart of this project lies a passion for more than just writing code — it’s about gaining a deep understanding of robust, scalable software systems. The focus is on a collaborative learning approach that tackles real-world challenges and explores architecture solutions that adapt and evolve with emerging trends. This isn’t just about theory — it’s about fostering long-term growth, sharing knowledge, and continuously evolving. Together, we transform complexity into clarity and ideas into actionable insights.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {['Collaborative Approach', 'Tailored Solutions', 'Long-Term Commitment', 'Shared Success'].map(text => (
                        <div key={text} className="bg-white shadow-md p-4 rounded-xl">
                            <p className="font-semibold">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 bg-white text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
                    <div className="flex justify-center">
                        <Image
                            src={cyberHandImage}
                            alt="Professional"
                            width={400}
                            height={400}
                            className="w-full max-w-xs sm:max-w-md h-auto object-contain"
                        />
                    </div>
                    <div>
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
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-8 sm:py-12 text-center text-xs sm:text-sm">
                <p>&copy; 2025 Moq. All rights reserved.</p>
            </footer>
        </main>
    );
}