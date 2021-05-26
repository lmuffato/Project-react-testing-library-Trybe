import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('test if pokemon card is rederized correctly', () => {
  it('test if pokemon information is shown', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();
  });
  it('test if favorite image shows when checked', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox.checked).toBe(false);
    userEvent.click(favoriteCheckbox);
    const favoriteImg = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteImg).toBeInTheDocument();
  });
});
