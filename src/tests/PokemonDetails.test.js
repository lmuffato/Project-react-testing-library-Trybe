import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries.',
};

const moreDetails = 'More details';

describe('Testando component Pokemon Details', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonDetails = getByText(moreDetails);
    expect(buttonDetails).toBeInTheDocument();
    userEvent.click(buttonDetails);
    expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
    expect(buttonDetails).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: /summary/i })).toBeInTheDocument();
    expect(getByText(pokemon.type)).toBeInTheDocument();
    const { value, measurementUnit } = pokemon.averageWeight;
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas ', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const buttonDetails = getByText(moreDetails);
    expect(buttonDetails).toBeInTheDocument();
    userEvent.click(buttonDetails);
    const h2 = getByRole('heading', { level: 2,
      name: `Game Locations of ${pokemon.name}` });
    expect(h2).toBeInTheDocument();
    const imgSrc = pokemon.foundAt.map(({ map }) => map);
    const location = getAllByAltText(`${pokemon.name} location`);
    expect(location.length).toBe(2);
    expect(location[0].src).toBe(imgSrc[0]);
    expect(location[1].src).toBe(imgSrc[1]);
  });
  test('Teste se existe na página uma seção com os mapas ', () => {
    const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);
    const buttonDetails = getByText(moreDetails);
    expect(buttonDetails).toBeInTheDocument();
    userEvent.click(buttonDetails);
    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
