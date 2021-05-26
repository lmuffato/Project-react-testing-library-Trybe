import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { PokemonDetails } from '../components';

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
    const pokemon = pokemons[4];
    const { getByRole, getAllByRole, getByText } = render(
      <PokemonDetails
        isPokemonFavoriteById={ { [pokemon.id]: false } }
        match={ { params: { id: pokemon.id } } }
        onUpdateFavoritePokemons={ jest.fn(() => {}) }
        pokemons={ pokemons }
      />,
    );
    const headerGameLocations = getByRole('heading',
      { name: `Game Locations of ${pokemon.name}` });

    expect(headerGameLocations).toBeInTheDocument();

    const locations = getAllByRole('img', { name: `${pokemon.name} location` });

    expect(locations).toHaveLength(pokemon.foundAt.length);

    locations.forEach((location, index) => {
      expect(location).toHaveAttribute('src', pokemon.foundAt[index].map);
      const locationName = getByText(pokemon.foundAt[index].location);
      expect(locationName).toBeInTheDocument();
    });
  });

  it('User can favor a pokémon through the details page.', () => {
    const { queryByText } = renderWithRouter(<App />);
    userEvent.click(queryByText(/more details/i));

    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
