import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 7', () => {
  test('If the datails of the selected pokémon is displayed', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const link = getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    const summary = getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const paragraph = getByText(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );
    expect(paragraph).toBeInTheDocument();
  });

  test(
    'If there is a section with maps about the locations of the pokemons', () => {
      const { getByRole, getByText, getAllByAltText } = renderWithRouter(
        <App />,
      );
      const pikachu = getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
      const link = getByRole('link', { name: /more details/i });
      userEvent.click(link);
      const h2 = getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
      expect(h2).toBeInTheDocument();
      const p1 = getByText('Kanto Viridian Forest');
      const p2 = getByText('Kanto Power Plant');
      expect(p1).toBeInTheDocument();
      expect(p2).toBeInTheDocument();
      const map = getAllByAltText('Pikachu location');
      expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    },
  );

  test('If the user can bookmark a pokemon through the details page.', () => {
    const {
      getByText, history, getByLabelText, getByRole, getByAltText,
    } = renderWithRouter(
      <App />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const link = getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheck = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
});
