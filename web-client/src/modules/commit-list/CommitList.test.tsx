import React from 'react';
import { act, render, screen } from '@testing-library/react';
import CommitListModule from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GitHubClient } from '../../http-clients/github-client';


describe('CommitList Module', () => {
    beforeAll(() => {
        const mockData: any = [{
            sha: "e5fb452a44ada13bae9336126722eff6b0aa1c14",
            commit: {
                committer: {
                    name: "GitHub",
                    email: "noreply@github.com",
                    date: "2022-08-21T14:35:51Z"
                },
                message: "test message",
            },
            committer: {
                avatar_url: "https://avatars.githubusercontent.com/u/19864447?v=4",
            },
        }];

        jest.spyOn(GitHubClient.prototype, 'getCommitsOfRepo').mockImplementationOnce((): any => ({ data: mockData }));

    });

    test('renders link', async () => {
        await act(async () => {
            render(<MemoryRouter>
                <CommitListModule params={{ owner: 'node', repo: 'nodeJs' }} />
            </MemoryRouter>)
        })

        const links: HTMLAnchorElement[] = screen.getAllByRole("link");
        expect(links[1].href).toContain("e5fb452a44ada13bae9336126722eff6b0aa1c14");
    });

});
