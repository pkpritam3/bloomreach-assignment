const express = require('express');
const router = express.Router();
const githubClient = require('../clients/github-client');
const DeveloperService = require('../services/developer_service');

/* GET commits listing. */
router.get('/:owner/:repo/commits', async function (req, res, next) {
    const { owner, repo } = req.params;
    const { since, until } = req.query;
    try {
        const response = await githubClient.getCommitsOfRepo(owner, repo, since, until);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

/* GET commits details. */
router.get('/:owner/:repo/commits/:commitId', async function (req, res, next) {
    const { owner, repo, commitId } = req.params;
    try {
        const response = await githubClient.getCommitDetails(owner, repo, commitId);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});


/* GET developers listing. */
router.get('/:owner/:repo/developers', async function (req, res, next) {
    const { owner, repo } = req.params;
    const { since, until } = req.query;
    try {
        const response = await githubClient.getCommitsOfRepo(owner, repo, since, until, 40);
        let promises = [];
        for (const commit of response.data) {
            promises.push(githubClient.getCommitDetails(owner, repo, commit.sha))
        }
        const responses = await Promise.all(promises);
        const developerService = new DeveloperService();
        const mappedData = developerService.formatElementData(responses.map(res=>res.data))
        res.json(mappedData);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
