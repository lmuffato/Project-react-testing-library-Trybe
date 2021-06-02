import React from 'react';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Testes sobre componente Pokedex.', () => {
  it('Testa a existência de uma tag H2 com texto: "Encountered pokémons".', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2Tag = getByText(/Encountered pokémons/i);
    expect(h2Tag).toBeInTheDocument();
  });
});
