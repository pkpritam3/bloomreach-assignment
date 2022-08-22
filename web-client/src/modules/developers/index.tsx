import React, { useCallback, useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs'
import { Link } from 'react-router-dom';
import Loading from '../../components/loading';
import { GitHubClient } from '../../http-clients/github-client';


type DevelopersModuleProps = {
    owner: string | undefined;
    repo: string | undefined;
}

const gitHubClient = new GitHubClient();

const DevelopersModule = (props: DevelopersModuleProps) => {
    const { owner, repo } = props;
    const [elements, setElements] = useState<any>([]);
    const [loading, setloading] = useState(false);
    const fetchDevelopersData = useCallback(
        async () => {
            setloading(true);
            const response = await gitHubClient.getDevelopersCommits(owner!, repo!);
            setElements(response.data);
            setloading(false);
        },
        [owner, repo],
    );

    useEffect(() => {
        fetchDevelopersData();
    }, [fetchDevelopersData]);

    if (loading) {
        return <Loading />
    }

    return (
        <div className='padding-s'>
            <div className='text-bold text-size-xl text-left margin-bottom-l'>
                <Link to='/'>{owner}/{repo}</Link>
            </div>
            <div data-testid='developer-module-title' className='text-bold text-size-xl text-left margin-bottom-l'>
                Developers Graph
            </div>
            <CytoscapeComponent
                elements={elements}
                layout={{ name: 'random' }}
                pan={{ x: 100, y: 200 }}
                stylesheet={[
                    {
                        selector: 'edge',
                        style: {
                            'label': 'data(label)' // maps to data.label
                        }
                    },
                    {
                        selector: 'node',
                        style: {
                            'label': 'data(label)' // maps to data.label
                        }
                    }
                ]}
                style={{ height: '500px', border: '1px solid #ddd' }} />
        </div>
    )
}

export default DevelopersModule;