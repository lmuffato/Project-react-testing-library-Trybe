import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Pokemon test', () => {
  it('Render pokemon card', () => {
    const pokemon = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    };
    const { getByRole, getByText, getAllByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getAllByText('Electric').length).toBe(2);
    expect(getByText(`Average weight: ${pokemon.averageWeight.value} `
     + `${pokemon.averageWeight.measurementUnit}`));
  });
});
