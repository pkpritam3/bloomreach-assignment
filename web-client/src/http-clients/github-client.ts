import axios, { AxiosInstance } from "axios";

export class GitHubClient {
    client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:3005'
        });
    }

    getCommitsOfRepo(owner: string, repo: string, since: string, until: string){
        return this.client.get(`/repos/${owner}/${repo}/commits?since=${since}&until=${until}`);
    }

    getCommitDetails = (owner: string, repo: string, commitId: string) => {
        return this.client.get(`/repos/${owner}/${repo}/commits/${commitId}`);
    }

    getDevelopersCommits = (owner: string, repo: string) => {
        return this.client.get(`/repos/${owner}/${repo}/developers`);
    }
}

