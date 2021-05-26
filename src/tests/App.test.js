import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('requirement 1 - testing the <App/> component', () => {
  it('Check for an "About" link', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('Check for an "Home" link', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('Check for an "Favorite Pokémons" link', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });
});
