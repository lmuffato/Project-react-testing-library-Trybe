import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('testing the component "Not Found"', () => {
  test('renders a reading with the text "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');

    expect(heading).toBeInTheDocument();
  });

  test('Testing the page shows the Pikachu image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toBeInTheDocument();
  });
});
