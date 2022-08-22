const express = require('express');
const router = express.Router();
const githubClient = require('../clients/github-client');

/* GET Search. */
router.get('/commits', async function (req, res, next) {
    const { q, per_page } = req.query;
    try {
        const response = await githubClient.searchCommits(q, per_page);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
