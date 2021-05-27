import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter.test';

describe('Testa componentes do app', () => {
  test('renderiza a pagina com `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renderiza pokedex como heading no texto', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renderiza o link da home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: /Home/i,
    });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renderiza o link about', () => {
    const { getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /About/i,
    });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const heading = getByRole('heading', {
      name: /About/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renderiza o link de pokemons favoritos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favPoke = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favPoke).toBeInTheDocument();
    userEvent.click(favPoke);
    const heading = getByRole('heading', {
      name: /Favorite/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  it('redireciona para a pagina 404 quando busca invalida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/error-404/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
