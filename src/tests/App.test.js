import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import App from '../App';

describe('Requisite 1', () => {
  test('Renders a hearding with the text `Pokédex`', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const headingPokedex = screen.getByRole('heading', { level: 1 });
    expect(headingPokedex).toBeInTheDocument();
    expect(headingPokedex).toHaveTextContent(/pokédex/i);
  });

  test('Req-1.1 - Pokédex é renderizada ao carregar a aplicação no caminho de URL /',
    () => {
      const { history } = renderWithRouter(
        <App />,
      );
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  test('Req-1.2 - O topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      const { history } = renderWithRouter(
        <App />,
      );

      const navbar = screen.getByRole('navigation');
      expect(navbar).toBeInTheDocument();

      const [linkHome, linkAbout, linkFavorites] = screen.getAllByRole('link');
      expect(linkHome).toHaveTextContent('Home');
      expect(linkAbout).toHaveTextContent('About');
      expect(linkFavorites).toHaveTextContent('Favorite Pokémons');
    });
});
