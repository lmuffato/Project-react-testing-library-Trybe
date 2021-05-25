import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test of app, render and nav', () => {
  test('Rendeniza na tela', () => {
    renderWithRouter(<App />);
    const title = screen.getByText('Pokédex');
    expect(title).toBeInTheDocument();
  });
  test('Encontra os links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
});

describe('Testes de redirecionamento', () => {
  test('Teste se a aplicação é redirecionada para a página inicial, na URL /'
  + 'ao clicar no link Home da barra de navegação.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const home = getByText('Home');
    userEvent.click(home);
    expect(pathname).toBe('/');
  });
  test(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
  ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL
  /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavPokemons = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(linkFavPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test(`Teste se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
