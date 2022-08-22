const axios = require('axios');

const baseURL = process.env.BASE_URL || 'https://api.github.com/';
const authToken = process.env.AUTH_TOKEN || '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';

const client = axios.create({
    baseURL,
    timeout: 5000,
    headers: { 'Authorization': `token ${authToken}` }
});

const githubClient = {};

githubClient.getCommitsOfRepo = (owner, repo, since, until, perPage) => {
    const per_page = perPage || 10;
    return client.get(`repos/${owner}/${repo}/commits`, { params: { since, until, per_page } });
}

githubClient.getCommitDetails = (owner, repo, commitId) => {
    return client.get(`repos/${owner}/${repo}/commits/${commitId}`);
}

githubClient.searchCommits = (q, perPage) => {
    const per_page = perPage || 10;
    return client.get('search/commits', { params: { q, per_page } });
}

module.exports = githubClient;
