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
});

