import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('teste gerais da página pókemons', () => {
  const favoritePokemonIds = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  const { history } = renderWithRouter(
    <App
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonIds }
    />,
  );

  const name = screen.getByTestId('pokemon-name');
  expect(name).toHaveTextContent('Pikachu');

  const type = screen.getByTestId('pokemon-type');
  expect(type).toHaveTextContent('Electric');

  const weigth = screen.getByTestId('pokemon-weight');
  expect(weigth).toHaveTextContent('Average weight: 6.0 kg');

  const image = screen.getByAltText('Pikachu sprite');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const details = screen.getByRole('link', { name: 'More details' });
  expect(details.href).toBe('http://localhost/pokemons/25');

  userEvent.click(details);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

  const favorite = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(favorite);

  const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});
