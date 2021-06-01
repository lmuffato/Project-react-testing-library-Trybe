import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found.', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2Test = getByRole('heading', {
      level: 2,
    });
    expect(h2Test).toHaveTextContent('Page requested not found');
  });

  it('Teste se página mostra a imagem indicada', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img[1]).toHaveAttribute('src', imgSource);
  });
});
