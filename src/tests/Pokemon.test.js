import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('test <Pokemon.js />', () => {
  it('test the rendering of a certain pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[2] }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const nameInPokemon = getByText('Caterpie');
    expect(nameInPokemon).toBeInTheDocument(); // testando nome correto
    const typeInPokemon = getByText('Bug');
    expect(typeInPokemon).toBeInTheDocument(); // testando tipo correto
    const weightInPokemon = getByText(/average weight: 2.9 kg/i);
    expect(weightInPokemon).toBeInTheDocument(); // testando peso correto
    const srcImageInPokemon = getByAltText('Caterpie sprite').src; // testando img correta
    expect(srcImageInPokemon).toEqual('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });

  it('test if the card has a correct link for details', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[2] }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const linkDetail = getByRole('link', {
      name: 'More details',
    }).href;
    // console.log(linkDetail);
    expect(linkDetail).toContain('/pokemons/10');
  });

  it('test if clicking on the link takes you to the correct page', () => {
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

  it('test if there is a star icon on favorite pokemon', () => {
    const valueTrue = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[2] }
        isFavorite={ valueTrue }
      />,
    );
    const srcStar = getByAltText('Caterpie is marked as favorite').src;
    expect(srcStar).toContain('star-icon.svg');
  });
});
