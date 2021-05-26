import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const pokemonDetail = /This intelligent Pokémon roasts/i;
const mapImg = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

describe('pokemon details', () => {
  it('render a detail page', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailButton = getByText('More details');
    fireEvent.click(detailButton);

    const detailHeading = getByText('Pikachu Details');
    expect(detailHeading).toBeInTheDocument();

    const gameLocations = getByText('Game Locations of Pikachu');
    expect(gameLocations).toBeInTheDocument();

    const mapImage = getAllByAltText('Pikachu location');
    expect(mapImage[0]).toBeInTheDocument();
    expect(mapImage[0].src).toBe(mapImg);
    expect(mapImage[1]).toBeInTheDocument();

    const sumary = getByText('Summary');
    expect(sumary).toBeInTheDocument();

    const sumaryText = getByText(pokemonDetail);
    expect(sumaryText).toBeInTheDocument();

    const favoriteButton = getByText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument(pokemonDetail);
  });
});
