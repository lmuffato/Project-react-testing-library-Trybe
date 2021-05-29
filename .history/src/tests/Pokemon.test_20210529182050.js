import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/MemoryRouter';
import { Pokemon } from '../components';

describe('render Pokemon.js />', () => {
  test('test the rendering of a certain pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokemon />,
    );

    const namePoke = getByText('Charmander');
    expect(namePoke).toBeInTheDocument();
    const typePoke = getByText('Fire');
    expect(typePoke).toBeInTheDocument();
    const weightPoke = getByText(/average weight: 8.5 kg/i);
    expect(weightPoke).toBeInTheDocument();
  });
});

test('test if the card has a correct link for details', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon />,
  );

  const linkDetail = getByRole('link', {
    name: 'More details',
  }).href;

  expect(linkDetail).toContain('/pokemons/10');
});

test('test if clicking on the link moves you to the correct link', () => {
  const { getByRole, history } = renderWithRouter(
    <Pokemon />,
  );

  const linkDetail = getByRole('link', {
    name: 'More details',
  });
  userEvent.click(linkDetail);
  const { pathname } = history.location;
  expect(pathname).toEqual('/pokemons/10');
});

test('test if exists a star icon on favorite pokemon', () => {
  const { getByAltText } = renderWithRouter(
    <Pokemon />,
  );
  const srcFav = getByAltText('Charmander is marked as favorite').src;
  expect(srcFav).toContain('star-icon.svg');
});
