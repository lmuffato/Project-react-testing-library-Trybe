import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const mockPkm = {
  id: pokemons[0].id,
  image: pokemons[0].image,
  moreInfo: pokemons[0].moreInfo,
  name: pokemons[0].name,
  summary: pokemons[0].summary,
  type: pokemons[0].type,
  averageWeight: {
    measurementUnit: pokemons[0].averageWeight.measurementUnit,
    value: pokemons[0].averageWeight.value,
  },
  foundAt: [
    {
      location: pokemons[0].foundAt[0].location,
      map: pokemons[0].foundAt[0].map,
    },
    {
      location: pokemons[0].foundAt[1].location,
      map: pokemons[0].foundAt[1].map,
    },
  ],
};

describe('PokemonDetails component', () => {
  test('Detailed information about selected Pokémon are rendered on screen', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    const linkDetailsPage = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetailsPage);

    expect(history.location.pathname).toBe(`/pokemons/${mockPkm.id}`);

    expect(linkDetailsPage).not.toBeInTheDocument();

    const headingDetailsPage = getByRole('heading', {
      name: `${mockPkm.name} Details`,
      level: 2,
    });
    expect(headingDetailsPage).toBeInTheDocument();

    const headingSummary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(headingSummary).toBeInTheDocument();

    const paragraph = screen
      .getByText(
        (content, element) => element.tagName.toLowerCase() === 'p'
        && content.includes('Pokémon'),
      );
    expect(paragraph).toBeInTheDocument();
  });

  test('Page renders a section with maps and locations of pokémon', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(`/pokemons/${mockPkm.id}`);

    const headingGameLocations = getByRole('heading', {
      name: `Game Locations of ${mockPkm.name}`,
      level: 2,
    });
    expect(headingGameLocations).toBeInTheDocument();

    const altText = `${mockPkm.name} location`;
    const imageAlt = screen.getAllByAltText(altText);
    expect(imageAlt).toHaveLength(2);
    expect(imageAlt[0].src).toBe(mockPkm.foundAt[0].map);
    expect(imageAlt[1].src).toBe(mockPkm.foundAt[1].map);

    const emElement = screen.getAllByText(
      (content, element) => element.tagName.toLowerCase() === 'em'
      && content.includes('Kanto'),
    );
    expect(emElement).toHaveLength(2);
  });

  test('User can mark a pokémon as favorite through the PokémonDetails page', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${mockPkm.id}`);

    const checkbox = screen.getByText('Pokémon favoritado?');
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(checkbox);
    expect(checkboxLabel).toBeChecked();

    history.push('/favorites');
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    history.push(`/pokemons/${mockPkm.id}`);
    userEvent.click(checkbox);
    expect(checkboxLabel).not.toBeChecked();
  });
});
