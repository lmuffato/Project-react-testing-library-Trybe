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
});
