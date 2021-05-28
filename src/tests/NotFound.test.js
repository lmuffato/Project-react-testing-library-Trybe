import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Should have a "NotFound" component', () => {
  it('Should have a h2 and an img', () => {
    const { getByAltText, getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/anything');
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    const notFoundMsg = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundMsg).toBeInTheDocument();
  });
});
