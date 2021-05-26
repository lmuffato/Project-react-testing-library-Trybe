import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Favorite Pokémmons component test', () => {
  test('test if the "No favorite pokémon found"'
+ ' message is displayed if nothing is selected', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const paragraph = getByText(/No favorite pokemon found/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('test if the all the favorite pokémon cards are displayed', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const fakePokemon = '/pokemons/25';
    history.push(`${fakePokemon}`);
    const favcheckbox = getByRole('checkbox');
    userEvent.click(favcheckbox);
    history.push('/favorites');
    const paragraph = getByText(/Pikachu/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });
});
