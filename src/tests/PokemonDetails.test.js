import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test the "PokemonDetails" component - Requirement 7', () => {
  it('test if the info details from the selected pokémon are rendered', () => {
    const {
      getAllByRole,
    } = renderWithRouter(<App />);
    const navElements = getAllByRole('link');
    userEvent.click(navElements[3]);
    const headings = getAllByRole('heading', { level: 2 });
    const pokeName = 'Pikachu';
    const text = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
    expect(headings[0]).toHaveTextContent(`${pokeName} Details`);
    expect(navElements[3]).not.toBeInTheDocument();
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[1].nextSibling).toHaveTextContent(text);
  });

  it('test the map location section from the selected pokémon', () => {
    const {
      getAllByRole,
      getAllByAltText,
    } = renderWithRouter(<App />);
    const navElements = getAllByRole('link');
    userEvent.click(navElements[3]);
    const headings = getAllByRole('heading', { level: 2 });
    const pokeName = 'Pikachu';
    const pokeLocations = getAllByAltText(`${pokeName} location`);
    expect(headings[2]).toHaveTextContent(`Game Locations of ${pokeName}`);
    expect(pokeLocations).toHaveLength(2);
    expect(pokeLocations[0]).toBeInTheDocument();
    expect(pokeLocations[0].nextSibling).toHaveTextContent('Kanto Viridian Forest');
    expect(pokeLocations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokeLocations[1]).toBeInTheDocument();
    expect(pokeLocations[1].nextSibling).toHaveTextContent('Kanto Power Plant');
    expect(pokeLocations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('test the favorite checkbox from the selected pokémon', () => {
    const {
      getAllByRole,
      getByLabelText,
      getByAltText,
    } = renderWithRouter(<App />);
    const navElements = getAllByRole('link');
    userEvent.click(navElements[3]);
    const pokeName = 'Pikachu';
    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckbox);
    const favoritedImg = getByAltText(`${pokeName} is marked as favorite`);
    expect(favoritedImg).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoritedImg).not.toBeInTheDocument();
  });
});

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
