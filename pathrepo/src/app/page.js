"use client";

import { useState } from "react";

const buildFileTree = (paths) => {
  const root = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part];
    });
  });

  return root;
};

const FileTree = ({ tree }) => {
  return (
    <ul className="pl-4 border-l border-gray-300">
      {Object.entries(tree).map(([key, value]) => (
        <li key={key} className="mb-1">
          <span className="font-mono text-gray-800">{key}</span>
          {value && <FileTree tree={value} />}
        </li>
      ))}
    </ul>
  );
};

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [filePaths, setFilePaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    setFilePaths([]);
    setCopySuccess(false);

    try {
      const response = await fetch(`/api/files?repoUrl=${encodeURIComponent(repoUrl)}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setFilePaths(data.files);
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

  const fileTree = buildFileTree(filePaths);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">GitHub Repository File Explorer</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub Repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="p-2 border rounded w-80 shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="w-full max-w-4xl bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">File Structure</h2>

          {filePaths.length > 0 && (
            <button
              onClick={copyAllPaths}
              className="p-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition flex items-center gap-1"
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
          <FileTree tree={fileTree} />
        ) : (
          <p className="text-gray-500 text-center">No files to display</p>
        )}
      </div>
    </div>
  );
}