import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testendo NotFound', () => {
  test('A página contém um heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  test('A página contém a seguinte imagem...', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
