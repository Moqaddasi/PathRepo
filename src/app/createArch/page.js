'use client';

import { useState, useRef, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Upload() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        category: 'general'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        // Auto-resize textarea as content grows
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
            setCharCount(formData.description.length);
        }
    }, [formData.description]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Format tags
        const formattedTags = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        try {
            await addDoc(collection(db, 'arches'), {
                title: formData.title,
                description: formData.description,
                tags: formattedTags,
                category: formData.category,
                createdAt: new Date(),
                readTime: Math.max(1, Math.ceil(formData.description.split(' ').length / 250))
            });
            window.location.href = 'archMenu';
        } catch (error) {
            console.error('Error adding document:', error);
            setError('Failed to create arch. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-white">
            <div className="max-w-3xl mx-auto p-6">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create New Architecture Pattern
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Document architectural patterns in a clear, comprehensive format
                    </p>
                </header>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-900 mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            placeholder="Enter a descriptive title for this architectural pattern"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-1">
                            <label htmlFor="category" className="block text-md font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            >
                                <option value="general">General</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="database">Database</option>
                                <option value="infrastructure">Infrastructure</option>
                                <option value="microservices">Microservices</option>
                                <option value="security">Security</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="tags" className="block text-md font-medium text-gray-700 mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                id="tags"
                                name="tags"
                                type="text"
                                placeholder="e.g., scalability, performance, cloud"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="description" className="block text-lg font-medium text-gray-900">
                                Description
                            </label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">{charCount} characters</span>
                                <button
                                    type="button"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {showPreview ? 'Edit' : 'Preview'}
                                </button>
                            </div>
                        </div>

                        {!showPreview ? (
                            <textarea
                                id="description"
                                name="description"
                                ref={descriptionRef}
                                required
                                placeholder="Describe the architectural pattern in detail... Include context, problem statement, solution, consequences, and examples."
                                value={formData.description}
                                onChange={handleChange}
                                rows={12}
                                className="w-full px-5 py-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-serif text-lg leading-relaxed shadow-sm"
                                style={{ minHeight: '400px' }}
                            />
                        ) : (
                            <div className="w-full min-h-96 px-5 py-4 border border-gray-200 rounded-lg text-gray-900 prose prose-lg max-w-none shadow-sm bg-gray-50">
                                {formData.description.split('\n').map((paragraph, idx) => (
                                    paragraph ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                                ))}
                            </div>
                        )}

                        <div className="text-xs text-gray-500 mt-2">
                            Supports plain text formatting. Use line breaks for paragraphs.
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-5 py-2 text-gray-600 font-medium hover:text-gray-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:bg-gray-400 shadow-sm"
                        >
                            {loading ? 'Publishing...' : 'Publish Pattern'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}