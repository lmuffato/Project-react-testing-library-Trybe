import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the Pokemon Details page', () => {
  const PATH = '/pokemons/25';
  test('shows detailed information of a Pokémon ', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(/^this intelligent/i)).toBeInTheDocument();
  });

  test('there is a section that shows maps', () => {
    const srcLocation = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const srcLocation2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    })).toBeInTheDocument();

    expect(screen.getByText(/kanto viridian/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power/i)).toBeInTheDocument();
    const imgLocation = screen.getAllByAltText(/pikachu location/i);
    expect(imgLocation[0]).toHaveAttribute('src', srcLocation);
    expect(imgLocation[1]).toHaveAttribute('src', srcLocation2);
  });

  test('mark as favorite', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const isFavorite = screen.getByRole('checkbox', {
      name: /Pokémon favoritado/i,
    });
    expect(isFavorite).not.toBeChecked();
    userEvent.click(isFavorite);
    expect(isFavorite).toBeChecked();
    userEvent.click(isFavorite);
    expect(isFavorite).not.toBeChecked();
  });
});
