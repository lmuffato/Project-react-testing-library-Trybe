import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

test('Tests PokemonDetails', () => {
  const { id, name, summary, foundAt } = pokemons[0];
  const isFavorite = { [id]: true };
  const { queryByText, queryByRole, queryAllByRole, queryByLabelText } = render(
    <PokemonDetails
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
      onUpdateFavoritePokemons={ (_, checked) => { isFavorite[id] = checked; } }
    />,
  );
  expect(queryByText(`${name} Details`)).toBeInTheDocument();

  expect(queryByRole('link', { name: 'More details' })).not.toBeInTheDocument();

  expect(
    queryByRole('heading', { name: 'Summary', level: 2 }),
  ).toBeInTheDocument();

  expect(queryByText(summary)).toBeInTheDocument();

  expect(
    queryByRole('heading', { name: `Game Locations of ${name}`, level: 2 }),
  ).toBeInTheDocument();

  const maps = queryAllByRole('img', { name: `${name} location` });
  expect(maps.length).toBe(foundAt.length);

  foundAt.forEach((location, index) => {
    expect(queryByText(location.location)).toBeInTheDocument();
    expect(maps[index]).toHaveAttribute('src', location.map);
  });

  const favoriteBtn = queryByLabelText('Pokémon favoritado?');

  expect(favoriteBtn.checked).toBeTruthy();
  fireEvent.change(favoriteBtn, { target: { checked: !favoriteBtn.checked } });
  expect(favoriteBtn.checked).toBeFalsy();
  fireEvent.change(favoriteBtn, { target: { checked: !favoriteBtn.checked } });
  expect(favoriteBtn.checked).toBeTruthy();
});
