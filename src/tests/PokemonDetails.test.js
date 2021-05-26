import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test \'Pokemon Details\' page', () => {
  it('Test if page is rendered', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);
    const pageTitle = getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(pageTitle).toBeInTheDocument();
    const locationsTitle = getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(locationsTitle).toBeInTheDocument();
    const favoriteCheckbox = getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    expect(favoriteCheckbox.checked).toBe(false);
  });
});