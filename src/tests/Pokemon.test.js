import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import info from '../data';
import App from '../App';

describe('testing App components', () => {
  const { averageWeight, name, type } = info[0];
  const { measurementUnit, value } = averageWeight;
  it('renders a content in the page about pokémons info.', () => {
    const { getByText, getByAltText, getByRole } = renderWithRouter(
      <Pokemon pokemon={ info[0] } />,
    );
    const pokeName = getByText(`${name}`);
    const pokeImg = getByAltText(`${name} sprite`);
    const pokeType = getByText(`${type}`);
    const pokeMenUnit = getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokeLink = getByRole('link', {
      name: /more details/i,
    });

    expect(pokeName).toBeInTheDocument();
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.src)
      .toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeType).toBeInTheDocument();
    expect(pokeMenUnit).toBeInTheDocument();
    expect(pokeLink).toBeInTheDocument();
  });

  it('test if there is a link and a path to `More details`', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ info[0] } />);
    const pokeLink = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('test if there is a link and a checkbox for favorite pokemons', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const pokeLink = getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokeLink);

    const pokeFav = getByRole('checkbox');
    userEvent.click(pokeFav);
    const isFav = getByAltText(`${name} is marked as favorite`);

    expect(pokeFav).toBeInTheDocument();
    expect(isFav).toBeInTheDocument();
    expect(isFav.src).toContain('/star-icon.svg');
  });
});
