const axios = require('axios');

const baseURL = process.env.BASE_URL || 'https://api.github.com/';
const authToken = process.env.AUTH_TOKEN || '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';

class GithubClient {
    constructor(){
        this.client = axios.create({
            baseURL,
            timeout: 5000,
            headers: { 'Authorization': `token ${authToken}` }
        });
    }
    getCommitsOfRepo(owner, repo, since, until, perPage) {
        const per_page = perPage || 10;
        return this.client.get(`repos/${owner}/${repo}/commits`, { params: { since, until, per_page } });
    }

    getCommitDetails(owner, repo, commitId) {
        return this.client.get(`repos/${owner}/${repo}/commits/${commitId}`);
    }

    searchCommits(q, perPage) {
        const per_page = perPage || 10;
        return this.client.get('search/commits', { params: { q, per_page } });
    }
}

module.exports = GithubClient;
