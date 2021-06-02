import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

describe('Test the "Pokemon" component - Requirement 6', () => {
  it('check if the Pokemon card is correctly rendered', () => {
    const {
      getByTestId,
      getByRole,
    } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    const value = '6.0';
    const measurementUnit = 'kg';
    const pokeImage = getByRole('img');
    expect(pokeName).toHaveTextContent(/Pikachu/i);
    expect(pokeType).toHaveTextContent(/Electric/i);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImage.alt).toBe(`${pokeName.innerHTML} sprite`);
  });

  it('test the Pokemon card elements and paths from App component', () => {
    const {
      getAllByRole,
      getByLabelText,
      getByAltText,
      history,
    } = renderWithRouter(<App />);

    const btnElements = getAllByRole('button');
    userEvent.click(btnElements[1]);
    const pokeName = 'Pikachu';
    const pokeID = '25';
    const navElements = getAllByRole('link');
    expect(navElements[3].href).toContain(`/pokemons/${pokeID}`);
    userEvent.click(navElements[3]);
    const { pathname } = history.location;
    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckbox);
    const favoritedImg = getByAltText(`${pokeName} is marked as favorite`);
    expect(pathname).toBe(`/pokemons/${pokeID}`);
    expect(favoritedImg.src).toContain('/star-icon.svg');
  });
});

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
