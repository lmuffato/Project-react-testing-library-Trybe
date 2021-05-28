import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('testing App components', () => {
  it('renders a reading with the text `page requested and an emoji`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      name: /Page requested not found Crying emoji/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('test if there is a pikachu crying img', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const pokedexImg = getByAltText(
      'Pikachu crying because the page requested was not found', {
      },
    );
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src)
      .toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
