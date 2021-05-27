import React from 'react';
import { MemoryRouter as BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const renderApp = () => render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
const renderAppWithRouter = () => renderWithRouter(<App />);
describe('App.test.js', () => {
  test('Exibe um texto que contém "Pokedex".', () => {
    const { getByText } = renderApp();
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Exibe links que devem possuir os textos Home, About e Favorite Pokémons', () => {
    const { getByRole } = renderApp();
    const linkHome = getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFav = getByRole('link', { name: /favorite pokémons/i });
    expect(linkFav).toBeInTheDocument();
  });
  test('Ao clicar em Home direciona para a pagina de início', () => {
    const { getByRole, history } = renderAppWithRouter();
    const linkHome = getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('Ao clicar em About direciona para a pagina de Sobre', () => {
    const { getByRole, history } = renderAppWithRouter();
    const linkAbout = getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Ao clicar em FavoritePokemons direciona para a pagina de favoritos', () => {
    const { getByRole, history } = renderAppWithRouter();
    const linkFavorites = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorites);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  test('Ao ir há uma pagina que não existe direciona para a pagina NotFound', () => {
    const { getByRole, history } = renderAppWithRouter();
    history.push('where-am-i?');
    const notFoundText = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });
    expect(notFoundText).toBeInTheDocument();
  });
});
