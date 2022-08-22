import React from 'react'
import { useParams } from 'react-router-dom';
import CommitDetailsModule from '../../modules/commit-details';

const CommitDetails = () => {
    const { owner, repo, commitId } = useParams();
    return (
        <CommitDetailsModule owner={owner} repo={repo} commitId={commitId} />
    )
}

export default CommitDetails;