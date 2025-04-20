'use client';

import { useState, useRef, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';

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

    // Function to insert markdown syntax at cursor position
    const insertMarkdown = (syntax, placeholder = '') => {
        const textarea = descriptionRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.description;

        // If text is selected, wrap it with the syntax
        if (start !== end) {
            const selectedText = text.substring(start, end);
            const newText = text.substring(0, start) + syntax[0] + selectedText + syntax[1] + text.substring(end);
            setFormData(prev => ({ ...prev, description: newText }));
            // Set cursor position after inserted text
            setTimeout(() => {
                textarea.selectionStart = start + syntax[0].length + selectedText.length + syntax[1].length;
                textarea.selectionEnd = textarea.selectionStart;
                textarea.focus();
            }, 0);
        } else {
            // If no text is selected, insert syntax with placeholder
            const newText = text.substring(0, start) + syntax[0] + placeholder + syntax[1] + text.substring(end);
            setFormData(prev => ({ ...prev, description: newText }));
            // Set cursor position inside the syntax (on the placeholder)
            setTimeout(() => {
                textarea.selectionStart = start + syntax[0].length;
                textarea.selectionEnd = start + syntax[0].length + placeholder.length;
                textarea.focus();
            }, 0);
        }
    };

    // Function to handle image upload
    const handleImageUpload = async (e) => {
        // This is a placeholder for your image upload logic
        // You would typically upload to Firebase Storage or another service
        // For now, we'll just insert markdown for an image with a placeholder URL
        insertMarkdown(['![Image description](', ')'], 'https://example.com/your-image.jpg');

        // Real implementation would be something like:
        /*
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                insertMarkdown(['![Image description](', ')'], url);
            } catch (error) {
                setError('Failed to upload image');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        */
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
                                <option value="PresentationPatterns">Presentation Patterns</option>
                                <option value="LayeredModularPatterns">Layered & Modular Patterns</option>
                                <option value="DistributedScalableSystems">Distributed & Scalable Systems</option>
                                <option value="DomainCentricPatterns">Domain-Centric Patterns</option>
                                <option value="ResilienceFaultTolerance">Resilience & Fault Tolerance</option>
                                <option value="DataFlowCommunication">Data Flow & Communication</option>
                                <option value="HybridEmerging">Hybrid & Emerging</option>
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

                        {/* Formatting toolbar */}
                        {!showPreview && (
                            <div className="mb-2 flex items-center gap-2 border text-black border-gray-200 rounded-lg p-2 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['**', '**'], 'bold text')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="Bold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055c1.143-.188 1.933-1.044 1.933-2.196 0-1.562-1.234-2.54-3.038-2.54H3.53v10h4.68zm-1.06-7.963h1.472c.93 0 1.554.385 1.554 1.164 0 .793-.642 1.228-1.768 1.228H7.15V5.037zm0 4.265h1.697c1.078 0 1.75.394 1.75 1.274 0 .857-.622 1.299-1.804 1.299H7.15V9.302z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['*', '*'], 'italic text')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="Italic"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['### ', '\n'], 'Heading')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="Heading"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M14 3.5a2 2 0 0 1-2 2h-1v9a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-9H6v9a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-9H3a2 2 0 0 1-2-2V3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v.5h10v-.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v.5z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['- ', '\n'], 'List item')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="List"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['```\n', '\n```'], 'code here')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="Code Block"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertMarkdown(['[', '](https://example.com)'], 'link text')}
                                    className="p-1.5 hover:bg-gray-200 rounded"
                                    title="Link"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                    </svg>
                                </button>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('imageInput').click()}
                                        className="p-1.5 hover:bg-gray-200 rounded"
                                        title="Image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                    </button>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                                <div className="flex-grow"></div>
                            </div>
                        )}

                        {!showPreview ? (
                            <textarea
                                id="description"
                                name="description"
                                ref={descriptionRef}
                                required
                                placeholder="Describe the architectural pattern in detail... Include context, problem statement, solution, consequences, and examples. Use markdown formatting for rich text."
                                value={formData.description}
                                onChange={handleChange}
                                rows={12}
                                className="w-full px-5 py-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-mono text-lg leading-relaxed shadow-sm"
                                style={{ minHeight: '400px' }}
                            />
                        ) : (
                            <div className="w-full min-h-96 px-5 py-4 border border-gray-200 rounded-lg text-gray-900 prose prose-lg max-w-none shadow-sm bg-gray-50 overflow-auto">
                                <ReactMarkdown>
                                    {formData.description}
                                </ReactMarkdown>
                            </div>
                        )}

                        <div className="text-xs text-gray-500 mt-2">
                            Supports Markdown formatting. Use toolbar buttons or Markdown syntax for rich text.
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