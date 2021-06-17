import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('About component', () => {
  test('Contains paragraph No favorite pokemon found', async () => {
    const {
      getByText,
      history,
    } = renderWithRouter(<App />);
    history.push('/favorites');

    const Nofavorite = getByText(/No favorite pokemon found/i);
    expect(Nofavorite).toBeInTheDocument();
  });

  test('Contains favorite pokemon cards', async () => {
    const {
      getByText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const linkMoreDetails = getByText('More details');
    const LinkSplit = linkMoreDetails.href.split('/');
    const LinkHistory = `/${LinkSplit[3]}/${LinkSplit[4]}`;

    history.push(LinkHistory);

    const pokemonDetails = getByText(/Pikachu Details/i);
    expect(pokemonDetails).toBeInTheDocument();

    const pokemonFavorite = getByLabelText('Pokémon favoritado?');
    expect(pokemonFavorite).toBeInTheDocument();

    userEvent.click(pokemonFavorite);
    expect(pokemonFavorite).toBeChecked();

    history.push('/favorites');

    const pokemonCard = getByText(/Average weight:/i);
    expect(pokemonCard).toBeInTheDocument();
  });
});
