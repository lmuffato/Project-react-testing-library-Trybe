import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/MemoryRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('render Pokemon.js />', () => {
  test('test the rendering of a certain pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[2] }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const namePoke = getByText('Caterpie');
    expect(namePoke).toBeInTheDocument();
    const typePoke = getByText('Bug');
    expect(typePoke).toBeInTheDocument();
    const weightPoke = getByText(/average weight: 2.9 kg/i);
    expect(weightPoke).toBeInTheDocument();
    const ImgPoke = getByAltText('Caterpie sprite').src;
    expect(ImgPoke).toEqual('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });
});

test('test if the card has a correct link for details', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[2] }
      isPokemonFavoriteById={ pokemons[0] }
    />,
  );

  const linkDetail = getByRole('link', {
    name: 'More details',
  }).href;

  expect(linkDetail).toContain('/pokemons/10');
});

test('test if clicking on the link moves you to the correct link', () => {
  const { getByRole, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[2] }
      isFavorite={ false }
    />,
  );

  const linkDetail = getByRole('link', {
    name: 'More details',
  });
  userEvent.click(linkDetail);
  const { pathname } = history.location;
  expect(pathname).toEqual('/pokemons/10');
});

test('test if exists a star icon on favorite pokemon', () => {
  const valueTrue = true;
  const { getByAltText } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[2] }
      isFavorite={ valueTrue }
    />,
  );
  const srcFav = getByAltText('Caterpie is marked as favorite').src;
  expect(srcFav).toContain('star-icon.svg');
});
