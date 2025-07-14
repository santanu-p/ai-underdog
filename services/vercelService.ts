// This service handles communication with the Vercel API.
// IMPORTANT: For a real production application, avoid hardcoding tokens.
// This token should be stored securely as an environment variable
// on your hosting platform (e.g., Vercel's own environment variables).
const VERCEL_ACCESS_TOKEN = import.meta.env.VITE_VERCEL_ACCESS_TOKEN; // Token name: VERCEL_APP
const VERCEL_API_URL = 'https://api.vercel.com/v13/deployments';

/**
 * Generates a Vercel-compatible project name from the user's prompt.
 * e.g., "A synthwave artist page" -> "ai-underdog-synthwave-artist-page"
 */
function generateProjectName(prompt: string): string {
    const sanitized = prompt
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .slice(0, 50); // Limit length
    return `ai-underdog-${sanitized || 'project'}`;
}

/**
 * Deploys the given HTML content to Vercel.
 * @param htmlContent The full HTML content of the website.
 * @param prompt The user prompt, used to generate a project name.
 * @returns The URL of the successful deployment.
 * @throws An error if the deployment fails.
 */
export async function deployToVercel(htmlContent: string, prompt: string): Promise<string> {
    const projectName = generateProjectName(prompt);

    const body = {
        name: projectName,
        files: [
            {
                file: 'index.html',
                data: htmlContent,
            },
        ],
        projectSettings: {
            framework: null, // We are deploying a static file, not a framework
        },
        target: 'production',
    };

    try {
        const response = await fetch(VERCEL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${VERCEL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
            // Vercel API errors are often in result.error.message
            const errorMessage = result?.error?.message || `HTTP error! Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        if (result.url) {
            // The URL provided by Vercel doesn't include the protocol, so we add it.
            return `https://${result.url}`;
        } else {
            throw new Error('Deployment succeeded, but no URL was returned.');
        }

    } catch (error) {
        console.error('Vercel API request failed:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred during deployment.');
    }
}