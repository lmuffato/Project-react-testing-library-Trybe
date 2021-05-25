import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('A página Pokédex é renderizada no caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });

    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

  it('A pagina contém links de navegação Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Ao clicar no link Home, é redirecionado para pagina inicial URL /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Ao clicar no link About, é redirecionado para URL /about', () => {
    // Escreva o teste aqui
  });

  it('Ao clicar no link Favorite Pokémons, é redirecionado para URL /favorites', () => {
    // Escreva o teste aqui
  });

  it('URL desconhecida redireciona para página Not Found', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
