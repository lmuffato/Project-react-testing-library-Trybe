import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testa se o componente <App.js /> é renderizado', () => {
  test('Testa se o Pokédex é renderizada ao carregar a aplicação', () => {
    const { history } = RenderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Testa se os links de navegação são renderizados na tela', () => {
    const { getAllByRole } = RenderWithRouter(<App />);
    const navLinks = getAllByRole('link');
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Favorite Pokémon');
  });
});

describe('Teste dos links de navegação', () => {
  test('Testa se /home é redirecionado ao ser clicado', () => {
    const { history } = RenderWithRouter(<App />);
    const { pathname } = history.location;
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    expect(pathname).toBe('/');
  });

  test('Testa se /about é redirecionado ao ser clicado', () => {
    const { history } = RenderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se /favoritePokemons é redirecionado ao ser clicado', () => {
    const { history } = RenderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a página  not found é renderizada', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/página não encontra');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
