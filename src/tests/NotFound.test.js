import React from 'react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('test NotFound component', () => {
  test('test if the page displays an h2 heading'
  + ' with the text `Page requested not found 😭`', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/xablau');
    const heading = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('test if the `NotFound` page contains a crying Pikachu image', () => {
    const { getByAltText, history } = renderWithRouter(<NotFound />);
    history.push('/xablau');
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const imagesrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imagesrc);
  });
});
