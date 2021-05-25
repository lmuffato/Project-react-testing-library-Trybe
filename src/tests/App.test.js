import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  test('renderiza o titulo  `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
  test('O primeiro link deve possuir o texto Home', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link', {
      name: /Home/i,
    });
    expect(link).toHaveLength(1);
  });
  test('O Segundo link deve possuir o texto About', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link', {
      name: /About/i,
    });
    expect(link).toHaveLength(1);
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const link = getAllByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(link).toHaveLength(1);
  });
  test('Se a aplicação é redirecionada pag home ao clicar no link Home.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const titlePage = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(titlePage).toBeInTheDocument();
  });
  test('Se a aplic. é redirecionada para a pág. About ao clicar no link About.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/About');
    const titlePage = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(titlePage).toBeInTheDocument();
  });
  test('redirecionada para a pag favorites ao clicar no link Favorite pokémons.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/Favorites');
    const titlePage = getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(titlePage).toBeInTheDocument();
  });
  test('redirecionada para a pag not found ao digitar link desconhecido.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/jkjlkjlk');
    const titlePage = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(titlePage).toBeInTheDocument();
  });
});
