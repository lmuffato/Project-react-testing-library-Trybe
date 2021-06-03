import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2 = getByText('Page requested not found');
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra uma imagem expecífica', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const imgAlt = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgAlt).toHaveAttribute('src', image);
  });
});
