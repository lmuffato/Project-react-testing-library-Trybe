import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requiriment 07 - Testing PokemonsDetails', () => {
  it('should display all the detailed information of pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    const details = getByText('More details');
    userEvent.click(details);
    const heading = getByText(`${name} Details`);
    expect(heading).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const summaryElement = getByText('Summary');
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.tagName).toBe('H2');
    const paragraph = getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });
  it(`there must be a section with the maps containing
    the locations of the pokémon`, () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const { name, foundAt } = pokemons[0];
    const details = getByText('More details');
    userEvent.click(details);
    const heading = getByText(`Game Locations of ${name}`);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    foundAt.forEach(({ location, map }, i) => {
      const pokeLocation = getByText(location);
      expect(pokeLocation).toBeInTheDocument();
      const locationImages = getAllByAltText(/location/);
      expect(locationImages[i]).toBeInTheDocument();
      expect(locationImages[i]).toHaveAttribute('src', map);
      expect(locationImages[i].alt).toBe(`${name} location`);
    });
  });
  it('you should be able to bookmark a pokémon through the details page', () => {
    const { getByRole, history, getByTestId, queryByTestId } = renderWithRouter(<App />);
    const checkMarkedFavorite = () => {
      history.push('/favorites');
      const pokeName = getByTestId('pokemon-name');
      expect(pokeName).toBeInTheDocument();
    };
    const checkRemovedFavorite = () => {
      history.push('/favorites');
      expect(queryByTestId('pokemon-name')).toBeNull();
    };
    const markFavorite = (id) => {
      history.push(`/pokemons/${id}`);
      const check = getByRole('checkbox');
      expect(check.parentElement.textContent).toBe('Pokémon favoritado?');
      userEvent.click(check);
    };
    markFavorite('10');
    checkMarkedFavorite();
    markFavorite('10');
    checkRemovedFavorite();
  });
});
