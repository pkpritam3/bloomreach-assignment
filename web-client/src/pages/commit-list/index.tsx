import React from 'react';
import { useParams } from 'react-router-dom';
import CommitListModule from '../../modules/commit-list';

const CommitList = () => {
    const { owner, repo } = useParams();
    return <CommitListModule params={{ owner, repo }} />
}

export default CommitList;