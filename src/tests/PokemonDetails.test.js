import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const routerDetails = (history) => history.push('/pokemons/25');

describe('testing the component "Pokémon"', () => {
  it('shows detailed information of the selected pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    routerDetails(history);

    const title = getByText('Pikachu Details');
    const summary = getByText('Summary');
    const paragraph = getByText('This intelligent Pokémon roasts hard'
      + ' berries with electricity to make them tender enough to eat.');
    expect(title).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('shows section with maps with the locations of the pokémon', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);
    routerDetails(history);

    const titleLocation = getByText('Game Locations of Pikachu');
    expect(titleLocation).toBeInTheDocument();

    const maps = getAllByAltText('Pikachu location');
    expect(maps).toHaveLength(2);
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('check if the user can favorited the pokemon', () => {
    const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);
    routerDetails(history);

    const radioFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(radioFavorite);
    expect(radioFavorite).toBeChecked();

    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon).toBeInTheDocument();
  });
});
