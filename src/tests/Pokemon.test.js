import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

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

describe('Testando o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ false } />);

    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();

    const typyPokemon = screen.getByText('Electric');
    expect(typyPokemon).toBeInTheDocument();

    const kgPokemon = 'Average weight: 6.0 kg';
    const weightPokemon = screen.getByText(kgPokemon);
    expect(weightPokemon).toBeInTheDocument();

    const srcPokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(srcPokemon);
    expect(img.alt).toBe('Pikachu sprite');
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link ', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(button);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
  });

  it('Testa se ao clicar no link de navegação do Pokémon'
  + 'se leva para detalhes do pokemon', () => {
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
    // console.log('poke', pathname);
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);

    const img = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
