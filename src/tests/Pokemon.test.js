import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test if Pokemon component', () => {
  it('renders the right pokemon name', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pikachu = getByTestId('pokemon-name');
    expect(pikachu).toHaveTextContent('Pikachu');
  });
  it('renders the right pokemon type', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pikachuType = getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');
  });
  it('renders the correct weight', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pokemonWeight = getByTestId('pokemon-weight');
    // Fonte: https://openbase.com/js/@testing-library/jest-native/documentation
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('renders the pokemon image', () => {
    const { getByAltText, getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('renders the right pokemon in url', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    // Fonte:https://reactrouter.com/web/api/history
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('renders a star when the pokemon is favorite', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const favoriteCheckbox = getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    const star = getByAltText(/pikachu is marked as favorite/i);
    expect(star.src).toContain('/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
