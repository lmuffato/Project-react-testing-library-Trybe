import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon component', () => {
  test('Contains card pokemon', () => {
    const {
      getByText,
      getByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const pokemonName = getByText(/Average weight:/i).previousSibling.previousSibling;
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const pokemonType = getByText(/Average weight:/i).previousSibling;
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonAverage = getByText(/Average weight:/i);
    expect(pokemonAverage.innerHTML).toBe('Average weight: 6.0 kg');

    const image = getByAltText('Pikachu sprite');
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(image.src).toContain(url);
  });

  test('Contains card page favorite', () => {
    const {
      getByText,
      getByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const linkMoreDetails = getByText('More details');
    const LinkSplit = linkMoreDetails.href.split('/');
    const LinkHistory = `/${LinkSplit[3]}/${LinkSplit[4]}`;
    expect(linkMoreDetails).toBeInTheDocument();
    expect(LinkHistory).toBe('/pokemons/25');

    history.push(LinkHistory);

    const pokemonFavorite = getByLabelText('Pokémon favoritado?');
    expect(pokemonFavorite).toBeInTheDocument();

    userEvent.click(pokemonFavorite);
    expect(pokemonFavorite).toBeChecked();

    history.push('/');

    const imageStar = getByAltText('Pikachu is marked as favorite');
    expect(imageStar).toBeInTheDocument();
    const src = '/star-icon.svg';
    expect(imageStar.src).toContain(src);
  });
});
