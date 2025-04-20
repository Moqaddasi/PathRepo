'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Link from 'next/link';

export default function PatternDetail({ params }) {
    const [pattern, setPattern] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchPattern() {
            if (!params?.id) {
                setError('Pattern ID is missing');
                setLoading(false);
                return;
            }

            try {
                const patternRef = doc(db, 'arches', params.id);
                const patternSnap = await getDoc(patternRef);
                console.log('Pattern Snap:', patternSnap);

                if (patternSnap.exists()) {
                    const patternData = patternSnap.data();
                    setPattern({
                        id: patternSnap.id,
                        ...patternData,
                        createdAt: patternData.createdAt?.toDate?.() || new Date()
                    });
                } else {
                    setError('Pattern not found');
                }
            } catch (err) {
                console.error('Error fetching pattern:', err);
                setError('Failed to load pattern');
            } finally {
                setLoading(false);
            }
        }

        fetchPattern();
    }, [params?.id]);

    // Format date for display
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format paragraphs with proper line breaks
    const formatContent = (content) => {
        if (!content) return [];
        return content.split('\n').filter(paragraph => paragraph.trim() !== '');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading pattern...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center py-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => router.back()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!pattern) {
        return null;
    }

    // Calculate estimated reading time
    const readTime = pattern.readTime ||
        Math.max(1, Math.ceil((pattern.description?.split(' ').length || 0) / 250));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/archMenu"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to patterns
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Article Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {pattern.category && (
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                                    {pattern.category}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                {readTime} min read
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {pattern.title}
                        </h1>

                        <div className="text-gray-500 text-sm">
                            Published on {formatDate(pattern.createdAt)}
                        </div>
                    </div>

                    {/* Tags */}
                    {pattern.tags && pattern.tags.length > 0 && (
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {pattern.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="px-6 py-8">
                        <div className="prose prose-blue prose-lg max-w-none">
                            {formatContent(pattern.description).map((paragraph, index) => (
                                <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Article Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <Link
                                href="/archMenu"
                                className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Back to all patterns
                            </Link>

                            <div className="flex space-x-4">
                                <button
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                    onClick={() => window.print()}
                                >
                                    Print
                                </button>

                                {/* <Link
                                    href={`/edit/${pattern.id}`}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Edit Pattern
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}