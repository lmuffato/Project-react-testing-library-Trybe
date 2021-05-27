import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Pokemon from '../components/Pokemon';

import data from '../data';
import renderWithRouter from '../renderWithRouter';

const pokemonEx = data[0];

describe('6 - Test the <Pokemon.js /> component', () => {
  describe('renders a card with the information of a certain Pokémon.', () => {
    it('The correct name of the Pokémon should be shown on the screen;', () => {
      const { getByTestId } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const name = getByTestId('pokemon-name').textContent;
      expect(name).toBe(pokemonEx.name);
    });
    it('The correct type of pokémon should be shown on the screen.', () => {
      const { getByTestId } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const name = getByTestId('pokemon-type').textContent;
      expect(name).toBe(pokemonEx.type);
    });
    it(`The average weight of the pokémon must be
      displayed in the given format`, () => {
      const { getByTestId } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const name = getByTestId('pokemon-weight').textContent;
      const { averageWeight: { value, measurementUnit } } = pokemonEx;
      expect(name).toBe(`Average weight: ${value} ${measurementUnit}`);
    });
    it('The Pokémon image should be displayed.', () => {
      const { getByRole } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { name, image } = pokemonEx;
      const img = getByRole('img', { name: `${name} sprite` });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', image);
    });

    it(`the Pokémon card indicated on the Pokédex contains a navigation
      link to view details of this Pokémon.`, () => {
      const { getByRole } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { id } = pokemonEx;
      const link = getByRole('link', { name: /More details/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${id}`);
    });
    it(`Test if clicking on the Pokémon navigation link redirects the
      application to the Pokémon details page.`, () => {
      const { findByRole, getByRole } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { name } = pokemonEx;
      const link = getByRole('link', { name: /More details/i });
      userEvent.click(link);
      const text = waitFor(() => findByRole('heading', {
        level: 2,
        name: `${name} details`,
      }));
      expect(text).toBeDefined();
    });
    it('the URL displayed in the browser changes to /pokemon/<id>', () => {
      const { getByRole, history } = renderWithRouter(
        <MemoryRouter initialEntries={ ['/'] }>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { id } = pokemonEx;
      const link = getByRole('link', { name: /More details/i });
      userEvent.click(link);
      history.push(`/pokemons/${id}`);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${id}`);
    });
  });

  describe('there is a star icon on favorite Pokémon.', () => {
    it(`The icon must be an image with the src attribute
      containing the path /star-icon.svg`, () => {
      const { getByRole } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { name } = pokemonEx;
      const star = getByRole('img', { name: `${name} is marked as favorite` });
      expect(star).toBeInTheDocument();
      expect(star).toHaveAttribute('src', '/star-icon.svg');
    });
    it(`The image must have the alt attribute equal
      to <pokemon> is marked as favorite`, () => {
      const { getByRole } = renderWithRouter(
        <MemoryRouter>
          <Pokemon pokemon={ pokemonEx } isFavorite showDetailsLink />
        </MemoryRouter>,
      );
      const { name } = pokemonEx;
      const star = getByRole('img', { name: `${name} is marked as favorite` });
      expect(star).toBeInTheDocument();
      expect(star).toHaveAttribute('alt', `${name} is marked as favorite`);
    });
  });
});
