import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeModule from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe('Home module', () => {

    test("renders with repoList available", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <HomeModule repoList={[{
                    id: 1,
                    name: 'Node',
                    owner: 'nodejs',
                    repo: 'node'
                }]} />
            </MemoryRouter>,
        );
        const title = getByTestId('home-module-title');
        expect(title).toBeInTheDocument();
    });

    test("should link", () => {
        render(
            <MemoryRouter>
                <HomeModule repoList={[{
                    id: 1,
                    name: 'Node',
                    owner: 'nodejs',
                    repo: 'node'
                }]} />
            </MemoryRouter>,
        );
        const links: HTMLAnchorElement[] = screen.getAllByRole("link");
        expect(links[0].textContent).toEqual("Node");
        expect(links[0].href).toContain("/nodejs/node/commits");
    });
});
