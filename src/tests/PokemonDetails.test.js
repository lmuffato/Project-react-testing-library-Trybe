import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('7 REQUIREMENT', () => {
  test('information about the pokemon', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const pokemonName = getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pokemonName).toBeInTheDocument();

    const summary = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const pokemonResume = /This intelligent Pokémon roasts hard berries/i;
    const byText = getByText(pokemonResume);
    expect(byText).toHaveTextContent(pokemonResume);
  });

  test('map section with pokemon information', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push('/pokemons/143');

    const summaryHeading = getByRole('heading', {
      name: /Game Locations of Snorlax/i,
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const img1 = getByAltText(/snorlax sprite/i);
    const img2 = getByAltText(/snorlax location/i);

    expect(img1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    expect(img2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
  });

  test('user should favorite a pokemon', () => {
    const { getByRole, getByLabelText, history } = renderWithRouter(<App />);
    history.push('/pokemons/143');

    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    const favoriteText = getByLabelText('Pokémon favoritado?');
    expect(favoriteText).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
  });
});
