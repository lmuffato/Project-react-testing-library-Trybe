import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

const pokemonData = {
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    measurementUnit: 'kg',
    value: '6.0',
  },
  id: 25,
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

let isPokemonFavoriteData = false;

describe('Component Pokemon.js tests', () => {
  test('Pokemon name, type, weight and img are correctly displayed', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemonData }
          isFavorite={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const pokemonName = getByText('Pikachu');
    const pokemonType = getByText('Electric');
    const pokemonWeight = getByText('Average weight: 6.0 kg');
    const pokemonImg = getByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toMatch(/Spr_5b_025_m.png/);
    expect(pokemonImg.alt).toBe('Pikachu sprite');
  });

  test('There is a More Details Link', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemonData }
          isFavorite={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const moreDetails = getByText('More details');

    expect(moreDetails).toBeInTheDocument();
    // Teste do atributo href baseado em consulta ao Stack Overflow
    // Link: https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Pokemon is favorite: favorite star + checked box', () => {
    isPokemonFavoriteData = true;
    const { getAllByRole } = render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemonData }
          isFavorite={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const starImg = getAllByRole('img')[1];

    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    expect(starImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
