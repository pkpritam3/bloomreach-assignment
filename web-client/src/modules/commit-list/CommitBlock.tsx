import React from 'react';
import Avatar from '../../components/avatar';
import styles from './CommitList.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

type CommitBlockProps = {
    message: string;
    committerName: string;
    committerDate: string;
    committerAvatarUrl: string;
    sha: string;
};

const CommitBlock = (props: CommitBlockProps) => {
    const { sha, message, committerName, committerDate, committerAvatarUrl } = props;
    return (
        <Link to={`${sha}`}>
            <div className={`border border-radius-10 padding-s text-left cursor-pointer ${styles.block}`}>
                <div className='text-bold margin-bottom-m'>{message.slice(0, 80)}...</div>
                <div className='d-flex align-items-center'>
                    <Avatar url={committerAvatarUrl} alt="Committer Avatar" />
                    <span className='text-bold margin-left-s'>{committerName}</span>
                    <span className='margin-left-s'>commited on</span>
                    <span className='margin-left-s'>{moment(committerDate).format('DD MMM YYYY')}</span>
                </div>
            </div>
        </Link>
    )
}

export default CommitBlock;
