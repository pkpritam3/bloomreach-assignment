import React, { useEffect } from 'react';
import HomeModule from '../../modules/home';


const repoList = [{
    id: 1,
    name: 'Node',
    owner: 'nodejs',
    repo: 'node'
}, {
    id: 2,
    name: 'Bloomreach',
    owner: 'bloomreach',
    repo: 'bloomreach-reference-spa'
}, {
    id: 3,
    name: 'Moment',
    owner: 'moment',
    repo: 'moment'
}];

const Home = () => {
    return (
        <HomeModule repoList={repoList} />
    )
}

export default Home;