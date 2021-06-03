import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('tests `NotFound` component', () => {
  test('contains an <h2> element whit the text `Page requested not found`', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('contains a `not found` image', () => {
    renderWithRouter((<NotFound />));
    const image = screen.getByAltText('Pikachu crying because the'
    + 'page requested was not found');
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
