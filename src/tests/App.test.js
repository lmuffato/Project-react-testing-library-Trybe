import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithHistory';
import App from '../App';

describe('testes do component App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('Testa se a página principal da Pokédex é renderizada no caminho de URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite/i)).toBeInTheDocument();
  });

  it('Testa se o link Home redirecionada para a página inicial', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const [linkHome] = getAllByRole('link');
    userEvent.click(linkHome);

    const { pathname: home } = history.location;
    expect(home).toBe('/');
  });

  it('Testa se o link About redirecionada para a página About', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const [linkAbout] = getAllByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const { pathname: about } = history.location;
    expect(about).toBe('/about');
  });

  it('Testa se o link favorites redirecionada para a página favorites', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const [linkFavorites] = getAllByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorites);

    const { pathname: favorites } = history.location;
    expect(favorites).toBe('/favorites');
  });

  it('Testa se é redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/nao-existe');

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
