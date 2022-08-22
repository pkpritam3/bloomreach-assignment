import React from 'react';
import { useParams } from 'react-router-dom';
import DevelopersModule from '../../modules/developers';

const Developers = () => {
  const { owner, repo } = useParams();
  return (
    <DevelopersModule owner={owner} repo={repo} />
  )
}

export default Developers;