import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1 - Teste o componente <App.js />',
  () => {
    it(`Teste se a página principal da Pokédex é renderizada
    ao carregar a aplicação no caminho de URL /.`,
    () => {
      const { getByText } = renderWithRouter(<App />);
      const heading = getByText(/pokédex/i);
      expect(heading).toBeInTheDocument();
    });
    it(`Teste se o topo da aplicação contém um conjunto fixo de links de navegação
    O primeiro link deve possuir o texto Home
    O segundo link deve possuir o texto About
    O terceiro link deve possuir o texto Favorite Pokémons`,
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const nav = getByRole('navigation');
      const navLinks = [...nav.children]
        .filter((child) => child.classList.contains('link'));
      expect(navLinks[0]).toHaveTextContent('Home');
      expect(navLinks[1]).toHaveTextContent('About');
      expect(navLinks[2]).toHaveTextContent('Favorite Pokémons');
    });
    it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`,
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const home = getByRole('link', { name: 'Home' });
      userEvent.click(home);
      expect(history.location.pathname).toBe('/');
    });
    it(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`,
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const about = getByRole('link', { name: 'About' });
      userEvent.click(about);
      expect(history.location.pathname).toBe('/about');
    });
    it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`,
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const favorites = getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favorites);
      expect(history.location.pathname).toBe('/favorites');
    });
    it(`Teste se a aplicação é redirecionada para a página Not Found
    ao entrar em uma URL desconhecida`,
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/paginaquenaoexiste');
      const text = getByRole('heading',
        { name: 'Page requested not found Crying emoji' });
      expect(text).toBeInTheDocument();
    });
  });
