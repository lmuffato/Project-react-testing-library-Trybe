import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('test the page composition', () => {
  it('test the image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
  });
  it('test the h2 text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent('About Pokédex');
  });
});
