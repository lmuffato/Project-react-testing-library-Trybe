import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test \'Favorite Pokémons\'', () => {
  it('Test if \'Favorite Pokémons\' is rendered', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const favoritesBtn = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesBtn);
    expect(getAllByText(/Favorite Pokémons/i).length).toBe(2);
  });

  it('Test if \'Favorite Pokémons\' if no cards are rendered if no Pokemon is favorited',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const favoritesBtn = getByText(/Favorite Pokémons/i);
      fireEvent.click(favoritesBtn);
      expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    });
});
