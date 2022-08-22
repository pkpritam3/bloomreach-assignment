import React from 'react';
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/avatar";
import Description from "../../components/description";
import { GitHubClient } from "../../http-clients/github-client";
import Loading from '../../components/loading';

type CommitDetailsModuleProps = {
    owner: string | undefined;
    repo: string | undefined;
    commitId: string | undefined;
};

type CommitDetailsState = {
    sha: string;
    commit: {
        message: string;
        committer: {
            name: string;
            date: string;
        }
    };
    files: Array<{ filename: string, status: string, changes: number, raw_url: string }>;
    committer: {
        avatar_url: string;
    };
}

const gitHubClient = new GitHubClient();

const CommitDetailsModule = (props: CommitDetailsModuleProps) => {
    const { owner, repo, commitId } = props;
    const [commitDetails, setCommitDetails] = useState<CommitDetailsState>({
        sha: '',
        commit: {
            message: '',
            committer: { name: '', date: '' }
        },
        files: [],
        committer: { avatar_url: '' }
    });

    const fetchCommmitDetails = useCallback(
        async () => {
            const response = await gitHubClient.getCommitDetails(owner!, repo!, commitId!);
            setCommitDetails(response.data);
        },
        [owner, repo, commitId],
    );


    useEffect(() => {
        fetchCommmitDetails();
    }, [fetchCommmitDetails]);

    if (!commitDetails.sha) {
        return <Loading />
    }

    return (
        <div>
            <div className='text-bold text-size-xl text-left margin-bottom-l'>
                <Link to='/'>{owner}/{repo}</Link>
            </div>
            <div className='text-bold text-left margin-bottom-l'>
                <Link to={`/${owner}/${repo}/commits`}>Comments</Link>/
                {commitId}
            </div>
            <div className='d-flex align-items-center margin-bottom-l '>
                <Avatar url={commitDetails.committer.avatar_url} alt="Committer Avatar" />
                <span className='text-bold margin-left-s'>{commitDetails.commit.committer.name}</span>
                <span className='margin-left-s'>commited on</span>
                <span className='margin-left-s'>{moment(commitDetails.commit.committer.date).format('DD MMM YYYY')}</span>
            </div>
            <div className="margin-bottom-l">
                <div className="margin-bottom-s">Commit Message:</div>
                <div className="border padding-s border-radius-5">
                    <Description text={commitDetails.commit.message} />
                </div>
            </div>

            <div className="margin-bottom-l">
                <div className="margin-bottom-s">Files:</div>
                <ul className='border padding-s border-radius-5'>
                    {commitDetails.files.map((file) => {
                        return (
                            <li key={file.raw_url} className="margin-bottom-s">
                                <a href={file.raw_url} target="blank">
                                    {file.filename}
                                </a>
                                <i>
                                    - {file.status}
                                </i>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CommitDetailsModule;