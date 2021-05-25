import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import alias from './utils/alias';
import App from '../App';

describe('Testes para o componente "App.js"', () => {
  const { link, checkIfIsRedirected } = alias;

  test('Renderiza um heading com o texto "Pokédex"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('A página principal da Pokédex é renderizada ao carregar a'
  + ' aplicação no caminho de URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const links = [
      link('Home'),
      link('About'),
      link('Favorite Pokémons'),
    ];

    function checkIfLinksAreInThePage(route) {
      history.push(route);
      links.forEach((linkElement) => {
        expect(linkElement).toBeInTheDocument();
      });
    }

    checkIfLinksAreInThePage('/');
    checkIfLinksAreInThePage('/about');
    checkIfLinksAreInThePage('/favorites');
  });

  test('A aplicação é redirecionada para a página inicial, na URL "/" '
  + 'ao clicar no link "Home" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    checkIfIsRedirected({
      from: '/about',
      to: '/',
      event: () => userEvent.click(link('Home')),
      history,
    });
  });

  test('A aplicação é redirecionada para a página de About, na URL'
  + ' "/about", ao clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    checkIfIsRedirected({
      from: '/',
      to: '/about',
      event: () => userEvent.click(link('About')),
      history,
    });
  });

  test('A aplicação é redirecionada para a página de "Pokémons Favoritados", na URL'
  + ' "/favorites", ao clicar no link "Favorite Pokémons" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    checkIfIsRedirected({
      from: '/about',
      to: '/favorites',
      event: () => userEvent.click(link('Favorite Pokémons')),
      history,
    });
  });

  test('A aplicação é redirecionada para a página "Not Found" ao'
  + ' entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/oh-oh-unknown-route-404');

    const textNotFound = screen.getByText(/not found/i);

    expect(textNotFound).toBeInTheDocument();
  });
});
