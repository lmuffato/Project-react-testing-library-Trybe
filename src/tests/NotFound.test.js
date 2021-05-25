import React from 'react';

import renderWithRouter from '../helper/renderWithRouter';
import { notFoundData } from '../services/dataTest';

import NotFound from '../components/NotFound';

describe('Requirement 4 - renders the NotFound', () => {
  const { imgSrc } = notFoundData;

  it('renders notFound heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const headingNotFound = getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(headingNotFound).toBeInTheDocument();

    const imageNotFound = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveAttribute('src', imgSrc);
  });
});
