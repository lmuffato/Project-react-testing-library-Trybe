import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
// import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

// const isPokemonFavoriteById = pokemons.map(() => true);
const pokemon = pokemons[0];

describe('Request 7: Test component PokemonDetails', () => {
  it('renders details Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(details);
    const title = getByRole('heading', {
      name: `${pokemon.name} Details`,
      level: 2,
    });
    const summary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    const paragraph = getByText('This intelligent Pokémon roasts hard '
      + 'berries with electricity to make them tender enough to eat.');
    expect(title).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
describe('renders Map', () => {
  it('maps containing the locations of the pokémon', () => {
    const { foundAt } = pokemon;
    const locations = foundAt.map(({ map }) => map);
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(details);
    const title = getByRole('heading', {
      name: `Game Locations of ${pokemon.name}`,
      level: 2,
    });
    const imageLocation = getAllByRole('img', {
      name: `${pokemon.name} location`,
    });
    imageLocation.forEach((location, i) => {
      expect(location).toHaveAttribute('src', locations[i]);
    });
    expect(title).toBeInTheDocument();
  });
});

describe('Test if the user can favor a Pokémon', () => {
  it('renders checkbok', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(details);
    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    fireEvent.click(label);
    const image = getByRole('img', {
      name: `${pokemon.name} is marked as favorite`,
    });
    const url = '/star-icon.svg';
    expect(image).toHaveAttribute('src', url);
  });
});
