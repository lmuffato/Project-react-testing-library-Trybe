import { getByAltText, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing Pokedex component', () => {
  const buttonNext = (getByText) => getByText('Próximo pokémon');

  test('renders a card with pokemon`s information', () => {
    const { getByText, getByAltText, container } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    userEvent.click(buttonDragon);

    const infosPokemon = container.querySelectorAll('p');
    const imagePokemon = getByAltText(/Dragonair sprite/i);

    expect(infosPokemon[0]).toHaveTextContent(/Dragonair/i);
    expect(infosPokemon[1]).toHaveTextContent(/Dragon/i);
    expect(infosPokemon[2]).toHaveTextContent(/Average weight: 16.5 kg/i);
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
  });

  test('the card contains a link to show the page more details', () => {
    const { getByText, getByRole, history, container } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    userEvent.click(buttonDragon);

    expect(history.location.pathname).toBe('/');

    const linkDetails = getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/148');
  });

  test('there is a star icon in favorited pokemons', () => {
    const { getByText, getByRole, history, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    expect(history.location.pathname).not.toBe('/');

    const checkFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);

    userEvent.click(getByText(/Home/i));

    expect(history.location.pathname).toBe('/');

    const icon = getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
