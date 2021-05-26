import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('render elements', () => {
  it('render header with text Page request not found and emoji', () => {
    renderWithRouter(<NotFound />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
    const emoji = screen.getByRole('img', { name: /crying emoji/i });
    expect(emoji).toBeInTheDocument();
  });
});
