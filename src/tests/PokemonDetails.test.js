import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('tests `PokemonDetails` component', () => {
  test('show detailed information about selected pokemon', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const nameDetails = screen.getByText('Pikachu Details');
    expect(nameDetails).toBeInTheDocument();
  });

  test('the link to pokemon detaisl do NOT exist', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const details = screen.queryByText(/More Details/i);
    expect(details).not.toBeInTheDocument();
  });

  test('contains a <h2> element with the text `Summary`', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const heading = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('contains a <p> element with the information about a selected pokemon', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const paragraph = screen.getByText('This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.');
    expect(paragraph).toBeInTheDocument();
  });

  test('contains a section with pokemon locations map', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const heading = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations[0]).toBeInTheDocument();
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('pokemon is favorited', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const isFavorite = screen.getByText('Pokémon favoritado?');
    expect(isFavorite).toBeInTheDocument();
  });
});

// Ref
// Durante todo o projeto consultei a documentação em https://testing-library.com/docs/react-testing-library/cheatsheet/
