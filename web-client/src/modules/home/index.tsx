import React from 'react';
import { Link } from 'react-router-dom';

type HomeModuleProps = {
    repoList: Array<{ id: number, name: string, owner: string, repo: string }>
}

const HomeModule = (props: HomeModuleProps) => {
    const { repoList } = props;
    return (<div>
        <h3 data-testid='home-module-title' className='margin-bottom-l'>Github Repositories</h3>
        <ul>
            {repoList.map(r => {
                return (
                    <li key={r.id} className="border padding-s border-radius-5 margin-bottom-s d-flex">
                        <Link style={{ flex: 1 }} to={`${r.owner}/${r.repo}/commits`}>{r.name}</Link>
                        <Link to={`${r.owner}/${r.repo}/developers`}>Developers graph</Link>
                    </li>
                )
            })}
        </ul>
    </div>

    )
}

export default HomeModule;