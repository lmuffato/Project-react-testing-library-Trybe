import { render } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';

describe('testando component pokedex', () => {
  test('testando se contem um h2 com o texto correto', () => {
    const { getByText } = render(<Pokedex />);
    const h2 = getByText('heading', { level: 2, name: 'Encountered pokémons' });

  });
});
