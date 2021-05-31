import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import PokemonDetails from '../components/PokemonDetails';
import data from '../data';
import App from '../App';

describe('testing App components', () => {
  const { name, summary, foundAt } = data[0];
  const locations = foundAt.map((info) => info.location);

  it('renders a content in the page about pokémons info.', () => {
    const { getByText, getByRole } = renderWithRouter(
      <App />,
    );

    const pokeLink = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokeLink);

    const headingDetails = getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });

    const headingSummary = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    const firstP = getByText(`${summary}`, {
    });

    expect(headingDetails).toBeInTheDocument();
    expect(pokeLink).not.toBeInTheDocument();
    expect(headingSummary).toBeInTheDocument();
    expect(firstP).toBeInTheDocument();
  });
  it('test if there is a location map for the pokemon', () => {
    const { container, getByRole, getByText, getAllByAltText } = renderWithRouter(
      <App />,
    );

    const pokeLink = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokeLink);

    const locationHeading = getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });

    const allLocations = container.querySelector('.pokemon-habitat');

    foundAt.forEach((item, index) => {
      const locationsFound = getByText(item.location);
      expect(locationsFound).toBeInTheDocument();
      const images = getAllByAltText(`${name} location`);
      expect(images[index]).toBeInTheDocument();
      expect(images[index]).toHaveAttribute('src', item.map);
    });

    expect(locationHeading).toBeInTheDocument();
    expect(allLocations.childElementCount).toEqual(locations.length);
  });
  it('test if a pokemon is favorite', () => {
    const { getByText, getByRole } = renderWithRouter(
      <App />,
    );
    const clickLink = getByRole('link', { name: /more details/i });
    userEvent.click(clickLink);

    const checkPoke = getByRole('checkbox');
    expect(checkPoke).toBeInTheDocument();
    const favoritePoke = getByText(/Pokémon Favoritado/i);
    expect(favoritePoke).toBeInTheDocument();
  });
});
