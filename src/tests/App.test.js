import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />, () =>', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
  });

  it('Teste se a página principal é renderizada no caminho de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a página principal é renderizada no caminho de URL /about', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a página principal é renderizada no caminho de URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste o redirecionando para as rotas', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkHome = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    const linkAbout = getByRole('link', {
      name: /about/i,
    });
    const linkFavorite = getByRole('link', {
      name: /favorite/i,
    });
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
});
