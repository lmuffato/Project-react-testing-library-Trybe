import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './RenderWithRouter';

// Trecho do código baseado na solução de Eduardo Costa
const pikachu = {
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
  summary: 'This intelligent Pokémon roasts hard berries with'
  + 'electricity to make them tender enough to eat.',
};

describe('test component pokemom', () => {
  test('teste renderizaçãso dados pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ false }
    />);

    const namePokemon = screen.getByText('Pikachu');
    const typePokemon = screen.getByText('Electric');
    const kgPokemon = 'Average weight: 6.0 kg';
    const weightPokemon = screen.getByText(kgPokemon);
    const srcPokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByRole('img');

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(img.src).toBe(srcPokemon);
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('test link para detalhes pokemon', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  // trecho do codigo baseado na solução encontrada por Eduardo Costa
  test('Test icon', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);

    const img = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
