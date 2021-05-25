import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('test if the component About renders perfectly', () => {
  test('render a text with "About Pokedex"', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('the correct url for the image', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
