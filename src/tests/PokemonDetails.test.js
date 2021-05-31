import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const goToPikachuRoute = (history) => history.push('/pokemons/25');

describe('Component PokemonDetails.js tests', () => {
  test('Details page is displayed correctly', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    goToPikachuRoute(history);

    const pikachuDetailsHeading = getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(pikachuDetailsHeading).toBeInTheDocument();

    const summaryHeading = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const gameLocationsHeading = getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(gameLocationsHeading).toBeInTheDocument();
  });

  test('Game Locations are Correctly Displayed', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    goToPikachuRoute(history);

    const pikachuMap1 = getAllByRole('img')[1];
    const pikachuMap2 = getAllByRole('img')[2];

    expect(pikachuMap1).toBeInTheDocument();
    expect(pikachuMap1).toHaveAttribute('alt', 'Pikachu location');
    expect(pikachuMap1.src).toMatch(/Kanto_Route_2_Map/);

    expect(pikachuMap2).toBeInTheDocument();
    expect(pikachuMap2).toHaveAttribute('alt', 'Pikachu location');
    expect(pikachuMap2.src).toMatch(/Kanto_Celadon_City_Map/);
  });

  test('Summary paragraph and checkbox are displayed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    goToPikachuRoute(history);

    const pikachuSummary = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/,
    );
    const isPokemonFavorite = getByText('Pokémon favoritado?');

    expect(pikachuSummary).toBeInTheDocument();
    expect(isPokemonFavorite).toBeInTheDocument();
  });
});
