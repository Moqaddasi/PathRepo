import { NextApiRequest, NextApiResponse } from "next";

const GITHUB_API_URL = "https://api.github.com/repos";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepoFiles(owner, repo, path = "") {
    const url = `${GITHUB_API_URL}/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url, {
        headers: {
            "Accept": "application/vnd.github.v3+json",
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
        },
    });

    if (!response.ok) {
        console.error(`Failed to fetch ${url}: ${response.statusText}`);
        return [];
    }

    const data = await response.json();
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
}

export default async function handler(req, res) {
    const { repoUrl } = req.query;

    if (!repoUrl || typeof repoUrl !== "string") {
        return res.status(400).json({ error: "Invalid repository URL" });
    }

    try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            return res.status(400).json({ error: "Invalid GitHub URL format" });
        }

        const owner = match[1];
        const repo = match[2];

        const files = await fetchRepoFiles(owner, repo);
        res.status(200).json({ files });
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}