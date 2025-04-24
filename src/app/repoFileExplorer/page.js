"use client";

import { useState, useEffect } from "react";

// Directory type mapping for color coding
const directoryColors = {
    src: "text-blue-600 dark:text-blue-400",
    components: "text-green-600 dark:text-green-400",
    pages: "text-purple-600 dark:text-purple-400",
    public: "text-yellow-600 dark:text-yellow-400",
    styles: "text-pink-600 dark:text-pink-400",
    tests: "text-red-600 dark:text-red-400",
    api: "text-orange-600 dark:text-orange-400",
    utils: "text-cyan-600 dark:text-cyan-400",
    lib: "text-indigo-600 dark:text-indigo-400",
    hooks: "text-emerald-600 dark:text-emerald-400",
    contexts: "text-rose-600 dark:text-rose-400",
    assets: "text-amber-600 dark:text-amber-400",
};

// Architecture patterns based on directory structure
const detectArchitecturePattern = (paths) => {
    const directories = new Set();

    paths.forEach(path => {
        const parts = path.split('/');
        if (parts.length > 1) {
            directories.add(parts[0].toLowerCase());
        }
    });

    const dirArray = Array.from(directories);

    // Check for common architecture patterns
    if (dirArray.includes('pages') && dirArray.includes('components')) {
        return "Next.js or similar page-based framework";
    } else if (dirArray.includes('src') && (dirArray.includes('components') || dirArray.includes('containers'))) {
        return "React Component-Based Architecture";
    } else if (dirArray.includes('src') && dirArray.includes('features')) {
        return "Feature-Based Architecture (possibly Redux Toolkit)";
    } else if (dirArray.includes('src') && dirArray.includes('views')) {
        return "MVC or MVVM Pattern";
    } else if (dirArray.includes('public') && dirArray.includes('src')) {
        return "Standard React/Frontend Application";
    } else if (dirArray.includes('controllers') && dirArray.includes('models')) {
        return "MVC Backend Architecture";
    } else if (dirArray.includes('api') && dirArray.includes('services')) {
        return "Service-Based Architecture";
    } else if (dirArray.includes('packages') || dirArray.includes('modules')) {
        return "Monorepo or Modular Architecture";
    }

    return "Standard Project Structure";
};

const buildFileTree = (paths) => {
    const root = {};

    paths.forEach((path) => {
        const parts = path.split("/");
        let current = root;

        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = index === parts.length - 1 ? { isFile: true, path } : { isFile: false, children: {}, path: parts.slice(0, index + 1).join('/') };
            }
            if (index < parts.length - 1) {
                current = current[part].children;
            }
        });
    });

    return root;
};

const FileTree = ({ tree, repoUrl }) => {
    return (
        <ul className="pl-4 border-l border-gray-300 dark:border-gray-700">
            {Object.entries(tree).map(([key, value]) => {
                const isFile = value.isFile;
                const path = value.path;
                const isDirectory = !isFile;

                // Determine if this is a special directory that should have a color
                const dirName = key.toLowerCase();
                const colorClass = isDirectory && directoryColors[dirName] ? directoryColors[dirName] : "text-gray-800 dark:text-gray-200";

                // Icon based on type
                const iconClass = isDirectory ? "folder" : "file";

                // Build GitHub URL for this item
                const githubUrl = `${repoUrl}/blob/master/${path}`;

                return (
                    <li key={key} className="mb-1">
                        <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded">
                            <span className={`${iconClass} mr-1`}>
                                {isDirectory ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6zm0 3h16v5a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>

                            {isFile ? (
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-mono ${colorClass} hover:underline`}
                                >
                                    {key}
                                </a>
                            ) : (
                                <span className={`font-mono ${colorClass} font-semibold`}>{key}</span>
                            )}
                        </div>

                        {isDirectory && <FileTree tree={value.children} repoUrl={repoUrl} />}
                    </li>
                );
            })}
        </ul>
    );
};

export default function RepoFileExplorer() {
    const [repoUrl, setRepoUrl] = useState("");
    const [filePaths, setFilePaths] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [architecturePattern, setArchitecturePattern] = useState("");

    // Initialize dark mode based on system preference
    useEffect(() => {
        // Check for system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }

        // Listen for changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setDarkMode(e.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Set proper classes when dark mode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const fetchFiles = async () => {
        setLoading(true);
        setError("");
        setFilePaths([]);
        setCopySuccess(false);
        setArchitecturePattern("");

        // Clean up the repo URL to get the base URL
        let cleanRepoUrl = repoUrl;
        if (cleanRepoUrl.includes("/blob/")) {
            cleanRepoUrl = cleanRepoUrl.split("/blob/")[0];
        } else if (cleanRepoUrl.includes("/tree/")) {
            cleanRepoUrl = cleanRepoUrl.split("/tree/")[0];
        }
        // Remove trailing slash if present
        cleanRepoUrl = cleanRepoUrl.replace(/\/$/, "");

        try {
            const response = await fetch(`/api/files?repoUrl=${encodeURIComponent(cleanRepoUrl)}`);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setFilePaths(data.files);
                // Detect architecture pattern
                const pattern = detectArchitecturePattern(data.files);
                setArchitecturePattern(pattern);
            }
        } catch (err) {
            setError("Failed to fetch files");
        } finally {
            setLoading(false);
        }
    };

    const copyAllPaths = () => {
        if (filePaths.length === 0) return;

        const formattedPaths = filePaths.join('\n');
        navigator.clipboard.writeText(formattedPaths)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => {
                setError("Failed to copy to clipboard");
            });
    };

    // Process the tree with proper structure for rendering
    const fileTree = Object.entries(buildFileTree(filePaths)).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    // Clean up repo URL to get the base URL for links
    const cleanRepoUrl = repoUrl.replace(/\/$/, "");

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">GitHub Repository File Explorer</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter GitHub Repo URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="p-2 border rounded w-80 shadow-sm text-black dark:text-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={fetchFiles}
                    className="p-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Fetch Files"}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {architecturePattern && (
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Project Architecture</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Based on the directory structure, this appears to be a: <span className="font-bold">{architecturePattern}</span>
                    </p>
                </div>
            )}

            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">File Structure</h2>

                    {filePaths.length > 0 && (
                        <button
                            onClick={copyAllPaths}
                            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-1"
                        >
                            {copySuccess ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                    Copy All Paths
                                </>
                            )}
                        </button>
                    )}
                </div>

                {filePaths.length > 0 ? (
                    <FileTree tree={fileTree} repoUrl={cleanRepoUrl} />
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No files to display</p>
                )}
            </div>

            {/* Directory Color Legend */}
            {filePaths.length > 0 && (
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow p-4 mt-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Directory Color Legend</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {Object.entries(directoryColors).map(([dir, colorClass]) => (
                            <div key={dir} className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H2V6zm0 3h16v5a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" clipRule="evenodd" />
                                </svg>
                                <span className={colorClass.split(' ')[0]}>{dir}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* About Me Section */}
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded shadow p-4 mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">About Me</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Amir Moq</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="https://www.linkedin.com/in/amirhoseinmoqaddasi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    LinkedIn Profile
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                <a href="https://github.com/Moqaddasi" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    GitHub Profile
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:ah.moqaddasi@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    ah.moqaddasi@gmail.com
                                </a>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Software Engineer | Feel free to connect with me on LinkedIn or check out my projects on GitHub.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Amir Moq. All rights reserved.</p>
            </footer>
        </div>
    );
}