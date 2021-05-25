// import { fireEvent } from '@testing-library/dom';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Request 4: test Not Found', () => {
  it('renders a heading with the text `Page requested not found`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });
  it('rendrs image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image).toHaveAttribute('src', url);
  });
});

// it('rendrs image', () => {
//   const { getByRole } = renderWithRouter(<About />);
//   const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
//   const image = getByRole('img', {
//     name: 'Pokédex',
//   });
//   expect(image).toHaveAttribute('src', url);
// });
