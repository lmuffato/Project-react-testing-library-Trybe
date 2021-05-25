import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/helper';

test('A página principal é exibida pra a url "/"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  const foundPokemon = getByText(/Encountered pokémons/i);
  expect(foundPokemon).toBeInTheDocument();
});

describe('Checa a barra de navegação', () => {
  it('Testa se os textos home, about e Favorite Pokemóns'
  + 'estão na barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Testa se ao clicar em "Home", a página home é carregada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    userEvent.click(home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });
  it('Testa se ao clicar em "About", a página about é carregada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    userEvent.click(about);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });
  it('Testa se ao clicar em "Favorite Pokemóns", a página favorites é carregada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText('Favorite Pokémons');
    userEvent.click(favorite);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });
  it('Testa se ao inserir uma url não existente a página notFound é carregada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nada');
    const pathName = history.location.pathname;
    const notFound = getByText('Page requested not found');

    expect(pathName).toBe('/nada');
    expect(notFound).toBeInTheDocument();
  });
});
