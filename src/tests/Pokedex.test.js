import React from 'react';
// import { Pokedex } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Pokedex', () => {
  it('Testa se renderiza um h2 com texto: Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });
  it('Testa se a pokédex tem um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetBtn = getByRole('button', { name: 'All' });
    expect(resetBtn).toBeInTheDocument();
  });
});
