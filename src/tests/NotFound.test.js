import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

const notFoundSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

it('should render the component "not found"', () => {
  const { history, getByRole } = renderWithRouter(<NotFound />);
  history.push('/route-not-found');
  const notFoundText = getByRole('heading',
    { name: /page requested not found/i, level: 2 });
  expect(notFoundText).toBeInTheDocument();
});

it('should contains an img with src "notFoundSrc"', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const image = getAllByRole('img');
  expect(image[1]).toHaveAttribute('src', notFoundSrc);
});
