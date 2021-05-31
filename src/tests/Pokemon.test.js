import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemonMock = {
  id: 54,
  name: 'Psyduck',
  type: 'Water',
  averageWeight: {
    value: '19.6',
    measurementUnit: 'kg',
  },
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Psyduck_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Seafoam Islands',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'its the best pokemon',
};

describe('Pokemon.test.js', () => {
  test('Exibe o nome do pokémon corretamente', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(pokemonMock.name);
  });
  test('Exibe o tipo do pokémon corretamente', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(pokemonMock.type);
  });
  test('Exibe o peso médio com a unidade de medida corretamente', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const { averageWeight } = pokemonMock;
    const pokeWeight = getByTestId('pokemon-weight');
    const mockedWeight = `${averageWeight.value} ${averageWeight.measurementUnit}`;
    expect(pokeWeight).toHaveTextContent(`Average weight: ${mockedWeight}`);
  });
  test('Exibe uma imagem do pokemon com o altText "pokemon Sprite"', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const pokeImage = getByAltText(`${pokemonMock.name} sprite`);
    expect(pokeImage).toBeInTheDocument();
  });
  test('Exibe uma imagem com o Link da imagem do pokemon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const pokeIMG = getByAltText(`${pokemonMock.name} sprite`).src;
    expect(pokeIMG).toBe(pokemonMock.image);
  });
  test('Exibe um link onde envia para os detalhes do Pokemon', () => {
    const { getByRole } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    const pokeDetails = getByRole('link', { name: /more details/i });
    expect(pokeDetails.href).toBe(`http://localhost/pokemons/${pokemonMock.id}`);
  });
  test('Ao clicar em detalhes, vai à uma pagina de detalhes', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ pokemonMock } />);
    userEvent.click(getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${pokemonMock.id}`);
  });
});
