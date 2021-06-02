import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('renderiza pokedx na tela', () => {
  test('Pokédex é renderizada ao carregar a aplicação', () => {
    const { history } = RenderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('busca os links de navegação', () => {
    const { getAllByRole } = RenderWithRouter(<App />);
    const navLinks = getAllByRole('link');
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Favorite Pokémon');
  });
});

describe('testa links de navegação', () => {
  test('testa se /home é redirecionado', () => {
    const { history } = RenderWithRouter(<App />);
    const { pathname } = history.location;
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    expect(pathname).toBe('/');
  });

  test('testa se /about é redirecionado', () => {
    const { history } = RenderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('testa se /favoritePokemons é redirecionado', () => {
    const { history } = RenderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('testa se a página  not found é renderizada', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/página não encontra');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
