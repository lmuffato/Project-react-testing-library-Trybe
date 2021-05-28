import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokemonRouteParams = {
  params: {
    id: pokemons[0].id.toString(),
  },
};

describe('Requisito 7', () => {
  test('Testando se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByRole, queryByText, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [pokemons[0].id]: false } }
        match={ pokemonRouteParams }
        pokemons={ [pokemons[0]] }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const { name } = pokemons[0];

    const detailsText = queryByText('More details');
    expect(detailsText).not.toBeInTheDocument();

    const headingDetails = getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(headingDetails).toBeInTheDocument();

    const headingSummary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(headingSummary).toBeInTheDocument();

    const textParagraph = 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.';
    const paragraph = getByText(textParagraph);
    expect(paragraph).toBeInTheDocument();
  });

  test('Testando se existe os mapas de localização do pokemon', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [pokemons[0].id]: false } }
        match={ pokemonRouteParams }
        pokemons={ [pokemons[0]] }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const { name } = pokemons[0];

    const headingLocations = getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(headingLocations).toBeInTheDocument();

    const imgTextOne = getAllByAltText(`${name} location`);
    const urlOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const textParagraphOne = getByText('Kanto Viridian Forest');

    expect(imgTextOne[0].src).toContain(urlOne);
    expect(textParagraphOne).toBeInTheDocument();

    const imgTextTwo = getAllByAltText(`${name} location`);
    const urlTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const textParagraphTwo = getByText('Kanto Power Plant');

    expect(imgTextTwo[1].src).toContain(urlTwo);
    expect(textParagraphTwo).toBeInTheDocument();
  });

  test('Testando se o usuário consegue favoritar o pokémon', () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ [pokemons[0].id] }
        match={ pokemonRouteParams }
        pokemons={ [pokemons[0]] }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const favoriteText = getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoriteText).toBeInTheDocument();

    userEvent.click(favoriteText);
    expect(favoriteText).toBeChecked();

    userEvent.click(favoriteText);
    expect(favoriteText).not.toBeChecked();
  });
});
