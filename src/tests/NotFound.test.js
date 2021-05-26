import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('4. Testando componente <NotFound />', () => {
  test('Testar se a página contém um h2 com um texto', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundHeading = getByRole('heading', { level: 2 });
    expect(notFoundHeading).toHaveTextContent('Page requested not found 😭');
  });

  test('Testar se a página contém uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgPath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain(imgPath);
  });
});
