import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

/**
 * Consultei o repositório do LeonarDev para resolver alguns testes.
 * Link: https://github.com/tryber/sd-09-project-react-testing-library/tree/6e8e8d7f61a32ee54d05d3aa49d97cd8712cf933
 */
describe('Testa o App.js', () => {
  it('Testa se o App foi renderizado na URL raiz', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  it('Testa se o primeiro link é "Home"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(homeLink).toBeInTheDocument();
  });

  it('Testa se o segundo link é "About"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });

    expect(aboutLink).toBeInTheDocument();
  });

  it('Testa se o terceiro link é "Favorite Pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('Testa se clicando em "Home" será redirecionado para a rota raiz', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se clicando em "About" será redirecionado para a rota /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se ao clicar em "Favorites" redireciona para a rota /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoriteLink = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  // Source: https://github.com/tryber/sd-09-project-react-testing-library/blob/6e8e8d7f61a32ee54d05d3aa49d97cd8712cf933/src/tests/App.test.js
  it('Testa se ao digitar uma url desconhecida redireciona para "Not Found"', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/whatever/');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
