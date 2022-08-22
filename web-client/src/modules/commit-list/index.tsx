import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GitHubClient } from '../../http-clients/github-client';
import CommitBlock from './CommitBlock';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { subDays } from 'date-fns';
import moment from 'moment';
import CustomDateRangePicker from '../../components/custom-date-range-picker';

type CommitListModuleProps = {
    params: {
        owner: string | undefined;
        repo: string | undefined;
    }
};

const gitHubClient = new GitHubClient();

const CommitListModule = (props: CommitListModuleProps) => {
    const { owner, repo } = props.params;
    const [commits, setCommits] = useState([]);
    const [date, setDate] = useState([
        {
            startDate: subDays(new Date(), 15),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleDateSelect = (ranges: any) => {
        setDate([ranges.selection]);
    }

    const fetchCommmitsData = useCallback(
        async () => {
            const since = moment(date[0].startDate).format('YYYY-MM-DDTHH:MM:SSZ');
            const until = moment(date[0].endDate).format('YYYY-MM-DDTHH:MM:SSZ');
            const response = await gitHubClient.getCommitsOfRepo(owner!, repo!, since, until);
            setCommits(response.data);
        },
        [owner, repo, date],
    );

    useEffect(() => {
        fetchCommmitsData();
    }, [fetchCommmitsData]);

    return (
        <div className='padding-s'>
            <div className='text-bold text-size-xl text-left margin-bottom-l'>
                <Link to='/'>{owner}/{repo}</Link>
            </div>
            <div className='d-flex'>
                <div className='text-bold margin-bottom-m flex-1' data-testid='commitlist-module-title'>
                    Commits
                </div>
                <CustomDateRangePicker selectedDate={date} dateSelectHandler={handleDateSelect} />
            </div>
            <ul>
                {commits.map((item: any) => {
                    const { message, committer } = item.commit;
                    return <li key={item.sha} className='margin-bottom-m'>
                        <CommitBlock
                            sha={item.sha}
                            committerAvatarUrl={item.committer.avatar_url}
                            message={message}
                            committerName={committer.name}
                            committerDate={committer.date} />
                    </li>
                })}
            </ul>
            {commits.length <= 0 &&
                <div data-testid='not-available' className='flex-d text-center border border-radius-5 text-bold padding-m'>
                    Not Available
                </div>
            }
        </div>
    )
}

export default CommitListModule;