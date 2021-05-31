import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokedexTitle = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(pokedexTitle).toBeInTheDocument();
  });
});
