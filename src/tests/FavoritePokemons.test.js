import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Testa se exibe "No favorite pokemon found" sem Pokémons favoritos,', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const titulo = getByText(/No favorite pokemon found/i);
    expect(titulo).toBeInTheDocument();
  });
});
