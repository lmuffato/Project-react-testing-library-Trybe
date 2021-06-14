import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa o componente PokemonDetails', () => {
  test('info detalhada sobre o pokemon', () => {
    renderWithRouter(<App />);
    const text = screen.getByText(/More Details/i);
    userEvent.click(text);
    const nameDetails = screen.getByText('Pikachu Details');
    expect(nameDetails).toBeInTheDocument();
  });

  test('o link para o pokemon n existe', () => {
    renderWithRouter(<App />);
    const text = screen.getByText(/More Details/i);
    userEvent.click(text);
    const details = screen.queryByText(/More Details/i);
    expect(details).not.toBeInTheDocument();
  });

  test('conte um elemento h2 no summary', () => {
    renderWithRouter(<App />);
    const text = screen.getByText(/More Details/i);
    userEvent.click(text);
    const heading = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('contem um elemento p sobre info do pokemon', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const paragraph = screen.getByText('This intelligent Pokémon roasts hard'
      + ' berries with electricity to make them tender enough to eat.');
    expect(paragraph).toBeInTheDocument();
  });

  test('contme um mapa com a localizacao do pokemon no mapa', () => {
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

  test('pokemon eh favorito', () => {
    renderWithRouter(<App />);
    const nav = screen.getByText(/More Details/i);
    userEvent.click(nav);
    const isFavorite = screen.getByText('Pokémon favoritado?');
    expect(isFavorite).toBeInTheDocument();
  });
});
