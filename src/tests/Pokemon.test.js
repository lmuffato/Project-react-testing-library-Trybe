import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('testando o componente Pokemon', () => {
  const isFavorite = true;
  const pokemon = {
    id: 1,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary: 'olá mundo.',
  };
  test('testando caracteristicas do pokemon', () => {
    const { getByTestId, getByAltText, getByText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />);
    const nome = getByTestId('pokemon-name');
    const tipo = getByTestId('pokemon-type');
    const peso = getByTestId('pokemon-weight');
    const img = getByAltText('Ekans sprite');
    const imgStar = getByAltText('Ekans is marked as favorite');
    const link = getByText('More details');

    expect(nome).toHaveTextContent('Ekans');
    expect(tipo).toHaveTextContent('Poison');
    expect(peso).toHaveTextContent('Average weight: 6.9 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    expect(imgStar.src).toBe('http://localhost/star-icon.svg');
    expect(link.href).toBe('http://localhost/pokemons/1');
  });
});
