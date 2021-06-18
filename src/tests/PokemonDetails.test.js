import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon Details component', () => {
  test('Contains information details', () => {
    const {
      getByText,
      getByRole,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const linkMoreDetails = getByText(/More details/i);
    const LinkSplit = linkMoreDetails.href.split('/');
    const LinkHistory = `/${LinkSplit[3]}/${LinkSplit[4]}`;
    expect(linkMoreDetails).toBeInTheDocument();
    expect(LinkHistory).toBe('/pokemons/25');

    history.push(LinkHistory);

    const heading2 = getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
    const text = /This intelligent Pokémon roasts hard berries with electricity/i;
    const paragraph = getByText(text);
    expect(paragraph).toBeInTheDocument();
  });

  test('Contains information maps', () => {
    const {
      getByText,
      getByRole,
      getAllByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const linkMoreDetails = getByText('More details');
    const LinkSplit = linkMoreDetails.href.split('/');
    const LinkHistory = `/${LinkSplit[3]}/${LinkSplit[4]}`;
    expect(linkMoreDetails).toBeInTheDocument();
    expect(LinkHistory).toBe('/pokemons/25');

    history.push(LinkHistory);

    const heading2 = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();

    const heading3 = getByText(/Summary/i);
    expect(heading3).toBeInTheDocument();

    const imageMaps = getAllByAltText('Pikachu location');
    for (let index = 0; index < imageMaps.length; index += 1) {
      expect(imageMaps[index]).toBeInTheDocument();
    }

    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(imageMaps[0].src).toContain(src1);
    const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imageMaps[1].src).toContain(src2);
  });

  test('Contains favorite pokemon cards', () => {
    const {
      getByText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const linkMoreDetails = getByText('More details');
    const LinkSplit = linkMoreDetails.href.split('/');
    const LinkHistory = `/${LinkSplit[3]}/${LinkSplit[4]}`;

    history.push(LinkHistory);

    const pokemonDetails = getByText(/Pikachu Details/i);
    expect(pokemonDetails).toBeInTheDocument();

    const pokemonFavorite = getByLabelText('Pokémon favoritado?');
    expect(pokemonFavorite).toBeInTheDocument();

    userEvent.click(pokemonFavorite);
    expect(pokemonFavorite).toBeChecked();

    userEvent.click(pokemonFavorite);
    expect(pokemonFavorite).not.toBeChecked();
  });
});
