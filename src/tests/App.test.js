import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Página principal', () => {
  it('Página Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    renderWithRouter(<App />);
    const pagPrincipal = screen.getByText(/encountered pokémons/iu);

    expect(pagPrincipal).toBeInTheDocument();
  });
});

describe('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  it('Links sequencialmente devem ser Home, About, Favorite Pokémons ', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorites = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it(`Aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação.`, () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home.getAttribute('href')).toBe('/');
  });

  it(`Aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação.`, () => {
    renderWithRouter(<App />);

    const about = screen.getByText('About');
    expect(about.getAttribute('href')).toBe('/about');
  });

  it(`Aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    renderWithRouter(<App />);

    const favorites = screen.getByText('Favorite Pokémons');
    expect(favorites.getAttribute('href')).toBe('/favorites');
  });

  it(`Aplicação é redirecionada para a página
   Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/urlDesconhecida');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
