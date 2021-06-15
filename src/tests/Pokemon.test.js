import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Pokemon.js tests', () => {
  const moreDetails = 'More details'
  it('render card content', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    const defaultPokemon = pokemons[0];
    userEvent.click(details);
    const pokemonName = getByText(defaultPokemon.name);
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = getByText(defaultPokemon.type);
    expect(pokemonType).toBeInTheDocument();
    const pokemonAvWeight = getByText('Average weight: 6.0 kg');
    expect(pokemonAvWeight).toBeInTheDocument();
    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', defaultPokemon.image);
  });

  it('verify nav', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const getBtn = getByText(moreDetails);
    userEvent.click(getBtn);  
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('verify marked as favorites', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const bookmarked = getByRole('checkbox');
    userEvent.click(bookmarked);
    const favoritePokemons = getByText('Favorite Pokémons');
    userEvent.click(favoritePokemons);
    const pokemonImage = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(pokemonImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
