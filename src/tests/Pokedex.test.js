import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });
});
