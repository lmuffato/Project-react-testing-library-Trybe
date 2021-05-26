import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('Testa a página "Not Found"', () => {
  it('Testa se renderiza um h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });

    expect(h2).toBeInTheDocument();
  });

  //Source: https://github.com/tryber/sd-010-a-project-react-testing-library/blob/a4d2962898a0c0ea03dbdc83bc8aa7b28eae4b28/src/tests/NotFound.test.js
  it('Testa se renderiza uma img', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image.src)
    .toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    expect(image).toBeInTheDocument();
  });
})