import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CommitList from './pages/commit-list';
import CommitDetails from './pages/commit-details';
import Developers from './pages/developers';

function App() {
  return (
    <div className="d-flex justify-content-center">
      <div className='width-800 flex-1 padding-m'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":owner/:repo/commits" element={<CommitList />} />
          <Route path=":owner/:repo/commits/:commitId" element={<CommitDetails />} />
          <Route path=":owner/:repo/developers" element={<Developers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
