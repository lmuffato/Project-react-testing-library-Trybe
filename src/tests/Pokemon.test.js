import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pokemon } from '../components';

describe('tests the pokemon component', () => {
  const pokemon = {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force. '
        + 'If it is weak, the flame also burns weakly.',
  };
  test('if a card is rendered with the information of a certain Pokémon.', () => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={ pokemon } isFavorite={ false } />
      </MemoryRouter>,
    );
    const nameElement = getByTestId('pokemon-name');
    const typeElement = getByTestId('pokemon-type');
    const weightElement = getByTestId('pokemon-weight');
    const imgElement = getByRole('img');

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;

    expect(nameElement).toHaveTextContent(name);
    expect(typeElement).toHaveTextContent(type);
    expect(weightElement)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(imgElement).toHaveAttribute('src', image);
    expect(imgElement).toHaveAttribute('alt', `${name} sprite`);
  });
});
