import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemon = pokemons[0];

test('renders Pokedex and execute all functions', () => {
  const history = createMemoryHistory();
  const { getByRole, getByText } = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } isFavorite showDetailsLink />
    </Router>,
  );

  const name = getByText(/Pikachu/i);
  expect(name).toBeInTheDocument();

  const type = getByText(/Electric/i);
  expect(type).toBeInTheDocument();

  const weigth = getByText(/Average weight: 6.0 kg/i);
  expect(weigth).toBeInTheDocument();

  const pokemonImage = getByRole('img', { name: /Pikachu sprite/i });
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const favImg = getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(favImg).toBeInTheDocument();
  expect(favImg.src).toContain('/star-icon.svg');

  const details = getByText(/More details/i);
  expect(details.href).toContain('pokemons/25');
  userEvent.click(details);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
