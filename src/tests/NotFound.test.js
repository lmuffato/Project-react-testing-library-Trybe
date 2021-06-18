import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Teste componente NotFound', () => {
  it('Teste com URL desconhecida', () => {
    const { getByRole, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/test'] }>
        <App />
      </MemoryRouter>,
    );

    const title = getByRole('heading', { level: 2, name: /Page requested not found/i });
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
