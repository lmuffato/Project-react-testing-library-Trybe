import React from 'react';
import { Link, MemoryRouter as BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

const renderApp = () => render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

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
});
