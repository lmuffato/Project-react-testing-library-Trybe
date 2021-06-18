import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('tests on PokemonDetails component', () => {
  const firstPokemon = pokemons[0];
  const moreDetails = () => screen.getByText(/more details/i);

  test('renders information details', () => {
    renderWithRouter(<App />);

    userEvent.click(moreDetails());
    expect(screen.queryByText(/more details/i)).toBeNull();

    const headerTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headerTitle).toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitle).toBeInTheDocument();

    const summary = screen.getByText(/This intelligent Pokémon roasts.../);
    expect(summary).toBeInTheDocument();
  });

  test('renders maps with pokemóns locations', () => {
    renderWithRouter(<App />);
    userEvent.click(moreDetails());

    const gameLocations = screen.getByRole('heading', {
      name: `Game Locations of ${firstPokemon.name}`,
      level: 2,
    });
    expect(gameLocations).toBeInTheDocument();

    firstPokemon.foundAt.forEach((place) => {
      const eachLocation = screen.getByText(place.location);
      expect(eachLocation).toBeInTheDocument();
    });

    const imgs = screen.getAllByAltText(`${firstPokemon.name} location`);

    firstPokemon.foundAt.forEach(({ map }, index) => {
      expect(imgs[index].src).toBe(map);
    });
  });

  test('favorite a pokemon on details page', () => {
    renderWithRouter(<App />);
    userEvent.click(moreDetails());

    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
