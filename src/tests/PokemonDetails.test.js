import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 7', () => {
  it('Details about the selected Pokémon is shown on the screen', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(queryByText(/more details/i)).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' }));
    expect(queryByText(/this intelligent pokémon roasts hard/i)).toBeInTheDocument();
  });

  it('Section with maps containing the locations of the pokémon', () => {
    const { queryByText, queryAllByAltText, getByRole } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));
    expect(queryByText(/game locations/i)).toBeInTheDocument();

    const headerGameLocations = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(headerGameLocations).toBeInTheDocument();

    const locations = queryAllByAltText(/pikachu location/i);
    expect(locations.length).toEqual(2);
    expect(locations[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locations[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  it('user can favor a pokémon through the details page.', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));

    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
