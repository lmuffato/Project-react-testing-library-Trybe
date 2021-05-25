import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "App"', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se o componente App se encontra na raiz da aplicação("/").', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se o topo da aplicação contém um conjunto'
  + 'fixo de links de navegação ("Home", "About", "Favorite Pokémons")', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorite = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página inicial,'
  + 'na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');

    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About,'
  + ' na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados'
  + ', na URL /favorites, ao clicar no link Favorite'
  + 'Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText('Favorite Pokémons');

    userEvent.click(favorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('NaoExisteEstaUrl');

    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
