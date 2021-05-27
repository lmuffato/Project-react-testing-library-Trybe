import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('', () => {
  it('shows the card with the specifications of the first pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toBeInTheDocument();
  });

  it('shows the card with the specifications of the last pokémon', () => {
    const { getByRole, getByTestId, getByAltText } = renderWithRouter(<App />);
    const btnDragon = getByRole('button', {
      name: /dragon/i,
    });
    userEvent.click(btnDragon);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Dragonair sprite');

    expect(pokemonName).toHaveTextContent('Dragonair');
    expect(pokemonType).toHaveTextContent('Dragon');
    expect(pokemonWeight).toHaveTextContent('Average weight: 16.5 kg');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(pokemonImg).toBeInTheDocument();
  });

  it('shows the card has a details link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('check for a star icon on favorite Pokémon', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const radioFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(radioFavorite);
    expect(radioFavorite).toBeChecked();

    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon).toBeInTheDocument();
  });
});
