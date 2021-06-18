import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Verifica mensagem se No favorite pokemon found é exibido', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noPokemons = getByText('No favorite pokemon found');

  expect(noPokemons).toBeInTheDocument();
});
