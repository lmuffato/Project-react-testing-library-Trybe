import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';

describe('Test \'Pokedex\' component', () => {
  it('Test heading \'Encountered pokémons\'', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Test button \'Próximo pokémon\'', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemonBtn);
    expect(queryByText(/Pikachu/)).toBeNull();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Test if there\' only one card at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonName = getAllByTestId('pokemon-name');
    const pokemonType = getAllByTestId('pokemon-type');
    const pokemonWeight = getAllByTestId('pokemon-weight');
    expect(pokemonName.length).toBe(1);
    expect(pokemonType.length).toBe(1);
    expect(pokemonWeight.length).toBe(1);
  });

  it('Test if Types can be selected through buttons', () => {
    const { getByText, getByTestId, getByRole,
      getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const nextButton = getByTestId('next-pokemon');
    const typeBtnsQty = 7;
    expect(typeButtons.length).toBe(typeBtnsQty);
    fireEvent.click(getByRole('button', { name: /electric/i }));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(getByRole('button', { name: /fire/i }));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    expect(nextButton.disabled).toBe(false);
    fireEvent.click(nextButton);
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: /all/i }));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Test if Filter Buttons are created dynamically', () => {
    const pokemons = [{
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
      summary: 'This intelligent Pokémon roasts hard berries'
      + 'with electricity to make them tender enough to eat.',
    },
    {
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
      summary: 'The flame on its tail shows the strength of'
      + 'its life force. If it is weak, the flame also burns weakly.',
    }];
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: false, 4: false } } />,
    );
    const typeButtons = getAllByTestId('pokemon-type-button');
    const typeBtnsQty = 2;
    expect(typeButtons.length).toBe(typeBtnsQty);
  });
});
