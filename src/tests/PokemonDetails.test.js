import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test \'Pokemon Details\' page', () => {
  it('Test if page is rendered', () => {
    const { getByRole, queryByRole, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);
    const pageTitle = getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(pageTitle).toBeInTheDocument();
    const paragraph = getByText(/Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
    const locationsTitle = getByRole('heading', { level: 2, name: /Summary/i });
    expect(locationsTitle).toBeInTheDocument();
    const favoriteCheckbox = getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    expect(favoriteCheckbox.checked).toBe(false);
    const nullDetailLink = queryByRole('link', { name: /More Details/i });
    expect(nullDetailLink).toBe(null);
  });

  it('Test if there is a map section', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);
    const locationsTitle = getByRole('heading',
      { level: 2, name: /Game Locations of Pikachu/i });
    expect(locationsTitle).toBeInTheDocument();
    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Test if Pokémon can be set as favorite', () => {
    const { queryByRole, getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);
    const nullIcon = queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(nullIcon).toBe(null);
    const favoriteCheckbox = getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
    const favoritedIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritedIcon).toBeInTheDocument();
  });
});
