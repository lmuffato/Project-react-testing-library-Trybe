import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import App from '../App';

// npx stryker run ./stryker/App.conf.json

// test('renders a reading with the text `Pokédex`', () => {
//     const heading = getByText(/Pokédex/);
//     expect(heading).toBeInTheDocument();
//   });
describe('requisito 1', () => {
  test('testando o conjunto dos links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
  
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  
  test('testando o redirecionamento dos links', () => {
    const historyMock = createBrowserHistory();
    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    const about = screen.getByRole('link', {
      name: 'About',
    });
    const favorito = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
  
    const funcLink = (link) => {
      userEvent.click(link);
      return historyMock.location.pathname;
    };

    const homePathname = funcLink(home);
    expect(homePathname).toEqual('/');
  
    const aboutPathname = funcLink(about);
    expect(aboutPathname).toEqual('/about');
  
    const favoritePathname = funcLink(favorito);
    expect(favoritePathname).toEqual('/favorites');
  
  });
})
