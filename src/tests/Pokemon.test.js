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
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /All/i });
    userEvent.click(button);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(/pikachu/i);

    const typyPokemon = screen.getByTestId('pokemon-type');
    expect(typyPokemon).toHaveTextContent(/electric/i);

    const weightPokemon = screen.getByTestId('pokemon-weight');
    const kgPokemon = 'Average weight: 6.0 kg';
    expect(weightPokemon).toHaveTextContent(kgPokemon);

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
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
    expect(pathname).toBe('/pokemons/25');
  });

  // it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
  //   renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);

  //   const img = screen.getByRole('img', {
  //     name: /pikachu is marked as favorite/i,
  //   });
  //   expect(img).toHaveAttribute('src', '/star-icon.svg');
  //   expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  // });
});
