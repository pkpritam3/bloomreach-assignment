
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/home';
import CommitList from './pages/commit-list';


describe('App Module', () => {

    test("navigates home by default", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>,
        );
        expect(screen.getByText('Github Repositories')).toBeInTheDocument()
    });

    test("navigates commit list", () => {
        render(
            <MemoryRouter initialEntries={['/owner/repo/commits']}>
                <CommitList />
            </MemoryRouter>,
        );
        expect(screen.getByText('Commits')).toBeInTheDocument()
    });

});


