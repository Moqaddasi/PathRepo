"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';


export default function ArchPatternGallery() {
    const [patterns, setPatterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Create a query with ordering by creation date (newest first)
        const q = query(
            collection(db, 'arches'),
        );

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const patternsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),

                    createdAt: doc.data().createdAt?.toDate?.() || new Date()
                }));
                setPatterns(patternsArray);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching patterns:", error);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    const filteredPatterns = patterns.filter(pattern => {
        const matchesCategory = selectedCategory === 'all' || pattern.category === selectedCategory;
        const matchesSearch = searchTerm === '' ||
            pattern.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pattern.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pattern.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    // Extract all unique categories from patterns
    const categories = ['all', ...new Set(patterns.map(pattern => pattern.category).filter(Boolean))];

    const formatRelativeTime = (date) => {
        if (!date) return '';

        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hr ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get excerpt of description
    const getExcerpt = (text, maxLength = 120) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Architecture Patterns</h1>
                            <p className="mt-1 text-gray-500">Browse and learn from architecture pattern examples</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            {/* <Link href="/upload"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Create New Pattern
                            </Link> */}
                            <Link href="/repoFileExplorer"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Repository Explorer
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search patterns..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="flex overflow-x-auto pb-1 sm:pb-0 space-x-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${selectedCategory === category
                                        ? 'bg-blue-100 text-blue-800 font-medium'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse text-gray-500">Loading patterns...</div>
                    </div>
                ) : filteredPatterns.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No patterns found. {searchTerm && 'Try a different search term.'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPatterns.map((pattern) => (
                            <div
                                key={pattern.id}
                                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center space-x-2 mb-2">
                                        {pattern.category && (
                                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                                {pattern.category}
                                            </span>
                                        )}
                                        {pattern.readTime && (
                                            <span className="text-gray-500 text-xs">
                                                {pattern.readTime} min read
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{pattern.title}</h2>

                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-l font-bold text-gray-900 mt-6 mb-4" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-l font-semibold text-gray-800 mt-5 mb-3" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-gray-700 my-4 leading-relaxed" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 text-gray-700" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 text-gray-700" {...props} />,
                                            li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                            a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline font-medium" {...props} />,
                                            blockquote: ({ node, ...props }) => <blockquote className="pl-4 border-l-4 border-gray-200 italic my-4 text-gray-700" {...props} />,
                                            code: ({ node, inline, ...props }) =>
                                                inline ?
                                                    <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props} /> :
                                                    <code {...props} />,
                                            pre: ({ node, ...props }) => <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto my-4 text-sm font-mono" {...props} />
                                        }}
                                    >
                                        {getExcerpt(pattern.description)}
                                    </ReactMarkdown>

                                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                                        {pattern.tags?.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                {tag}
                                            </span>
                                        ))}
                                        {pattern.tags?.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                +{pattern.tags.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-gray-500 text-sm">
                                            {formatRelativeTime(pattern.createdAt)}
                                        </span>
                                        <Link
                                            href={`/archMenu/${pattern.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}