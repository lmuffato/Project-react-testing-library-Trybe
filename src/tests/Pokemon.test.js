import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente Pokemon', () => {
  test('Teste se é redenrizado um card com o nome correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemons[0].name);
  });

  test('Teste se é redenrizado um card com o tipe correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(pokemons[0].type);
  });

  test('Teste se é redenrizado um card com o peso medio correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    const averageWeight = (
      `${pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`
    );
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(averageWeight);
  });

  test('Deve ter a img com src e alt corretos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(pokemons[0].image);
    expect(img.alt).toContain(`${pokemons[0].name} sprite`);
  });
});
