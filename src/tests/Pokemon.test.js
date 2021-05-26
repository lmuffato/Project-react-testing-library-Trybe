import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('pokemon', () => {
  it('render a pokemon', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeigth = getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeigth).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('move do details page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsButton = getByText('More details');
    fireEvent.click(detailsButton);

    const detailHeading = getByText('Pikachu Details');
    expect(detailHeading).toBeInTheDocument();
  });

  it('favorite a pokemon', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const detailsButton = getByText('More details');
    fireEvent.click(detailsButton);

    const favoriteButton = getByText('Pokémon favoritado?');
    fireEvent.click(favoriteButton);

    const homeLink = getByText('Home');
    fireEvent.click(homeLink);

    const favoriteImage = getByAltText('Pikachu is marked as favorite');
    expect(favoriteImage).toBeInTheDocument();
    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
