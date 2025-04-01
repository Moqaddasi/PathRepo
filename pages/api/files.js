const GITHUB_API_URL = "https://api.github.com/repos";

async function fetchRepoFiles(owner, repo, path = "") {
    const url = `${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        if (!Array.isArray(data)) return [];

        let files = [];

        for (const item of data) {
            if (item.type === "file") {
                files.push(item.path);
            } else if (item.type === "dir") {
                const subFiles = await fetchRepoFiles(owner, repo, item.path);
                files = files.concat(subFiles);
            }
        }

        return files;
    } catch (error) {
        console.error(`Error fetching GitHub files:`, error);
        return [];
    }
}

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { repoUrl } = req.query;

    if (!repoUrl || typeof repoUrl !== "string") {
        return res.status(400).json({ error: "Invalid repository URL" });
    }

    try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            return res.status(400).json({ error: "Invalid GitHub URL format" });
        }

        const [_, owner, repo] = match;

        const files = await fetchRepoFiles(owner, repo);

        if (files.length === 0) {
            return res.status(404).json({ error: "No files found or repository is private" });
        }

        res.status(200).json({ files });
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}