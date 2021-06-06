import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests `PokemonDetails` component', () => {
  test('renders pokemons`s detailed info', () => {
    const { getByText } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const nameDetails = getByText('Pikachu Details');
    expect(nameDetails).toBeInTheDocument();
  });

  test('link to details not found', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const details = queryByText(/More Details/i);
    expect(details).not.toBeInTheDocument();
  });

  test('renders a Summary heading', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const heading = getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders a <p> with pokemon info', () => {
    const { getByText } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const paragraph = getByText('This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.');
    expect(paragraph).toBeInTheDocument();
  });

  test('contains a section with pokemon locations map', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const heading = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const locations = getAllByAltText('Pikachu location');
    expect(locations[0]).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('checks if a pokemon is favorited', () => {
    const { getByText } = renderWithRouter(<App />);
    const nav = getByText(/More Details/i);
    userEvent.click(nav);
    const isFavorite = getByText('Pokémon favoritado?');
    expect(isFavorite).toBeInTheDocument();
  });
});

// consultei a lógica do PR da ThalitaC e fiz algumas mudanças;
