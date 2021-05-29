import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste da pagina inicial', () => {
  const mesage = 'Teste se a página principal da Pokédex é renderizada na URL /';
  it(mesage, () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });
});
describe('Teste se existe um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('O segundo link deve possuir o texto About.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[1].innerHTML).toBe('About');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('Testando rotas de navegação', () => {
  it('Teste redirecionamento para a página inicial ao clicar no link Home', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /about/i }));
    expect(screen.history.location.pathname).toBe('/about');
    userEvent.click(screen.getByRole('link', { name: /home/i }));
    expect(screen.history.location.pathname).toBe('/');
  });
  it('Teste redirecionamento para a página "sobre" ao clicar no link about', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /about/i }));
    expect(screen.history.location.pathname).toBe('/about');
  });
  it('Teste direcionamento p/ "favoritos" ao clicar no link "Favorite Pokémons"', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /favorite/i }));
    expect(screen.history.location.pathname).toBe('/favorites');
  });
  it('Teste direcionamento p/ "Not Found" ao digitar url desconhecida', () => {
    const screen = renderWithRouter(<App />);
    screen.history.push('/xablau');
    const headingNotFound = screen.getByRole('heading', { name: /not found/ });
    expect(headingNotFound).toBeInTheDocument();
  });
});
