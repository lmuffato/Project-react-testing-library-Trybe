import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const quantidadeBotoes = 9;

describe('App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { history, getByText, getAllByRole } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const linkHome = getByText('Home');
    expect(linkHome).toBeInTheDocument(linkHome);
    userEvent.click(linkHome);
    const botoes = getAllByRole('button');
    expect(botoes.length).toBe(quantidadeBotoes);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testing link about', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const textoAbout = getByText(/This application/i);
    expect(textoAbout).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testing link favorite', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const linkFavorite = getByText('Favorite Pokémons');
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    const textoFavorite = getByText('Favorite Pokémons');
    expect(textoFavorite).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('testing not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/Qualquerpagina/');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
