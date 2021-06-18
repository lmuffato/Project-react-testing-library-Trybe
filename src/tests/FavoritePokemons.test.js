import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

test('A página contém uma mensagem', () => {
  const { getByText } = render(<FavoritePokemons />);
  const mensagem = getByText('No favorite pokemon found');
  expect(mensagem).toBeInTheDocument();
});
