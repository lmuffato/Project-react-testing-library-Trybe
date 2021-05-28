import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requirement - testing <PokedemonDetails/>', () => {
  const moreDetails = 'More details';
  it('Checks text "Game locations of Pikachu"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', { name: moreDetails });
    fireEvent.click(buttonMoreDetails);
    const textLocation = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(textLocation).toBeDefined();
  });

  it('Checks text "Summary"', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', { name: moreDetails });
    fireEvent.click(buttonMoreDetails);
    const textSummary = getByRole('heading', { name: 'Summary' });
    const textSummaryPokemon = getByText('This intelligent Pokémon roasts hard '
       + 'berries with electricity to make them tender enough to eat.');
    expect(textSummary).toBeDefined();
    expect(textSummaryPokemon).toBeDefined();
  });

  it('Checks location images', () => {
    const { getAllByAltText, getByRole } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', { name: moreDetails });
    fireEvent.click(buttonMoreDetails);
    const image = getAllByAltText('Pikachu location')[0];
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Checks location images', () => {
    const { getByLabelText, getByRole } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', { name: moreDetails });
    fireEvent.click(buttonMoreDetails);
    const text = getByLabelText('Pokémon favoritado?');
    expect(text).toBeInTheDocument();
  });

  it('Checks text "Game locations of Pikachu"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonMoreDetails = getByRole('link', { name: moreDetails });
    fireEvent.click(buttonMoreDetails);
    const textDetails = getByRole('heading', { name: 'Pikachu Details' });
    expect(textDetails).toBeInTheDocument();
  });
});
