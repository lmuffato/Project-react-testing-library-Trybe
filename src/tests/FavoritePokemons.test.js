import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('tests for the FavoritePokemons component', () => {
  it('test if there is a message on the screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const messageNegative = screen.getByText('No favorite pokemon found');

    expect(messageNegative).toBeInTheDocument();
  });

  it('Tests if all favorite Pokemon cards are displayed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const input = screen.getByLabelText('Pokémon favoritado?');

    expect(input).toBeInTheDocument();
    userEvent.click(input);
    history.push('/favorites');

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
