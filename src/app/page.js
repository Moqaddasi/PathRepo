"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LandingPage = () => {
    const router = useRouter();

    const items = [
        { id: 1, title: 'Item 1', description: 'Description for Item 1' },
        { id: 2, title: 'Item 2', description: 'Description for Item 2' },
        { id: 3, title: 'Item 3', description: 'Description for Item 3' },
        { id: 4, title: 'Item 4', description: 'Description for Item 4' },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to the Landing Page</h1>
                <Link href="/repoFileExplorer"
                    className="mb-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Go to Repository Explorer
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 max-w-6xl">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LandingPage;