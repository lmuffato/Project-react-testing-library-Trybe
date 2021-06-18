import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('requisito 4', () => {
  test('verifica se há um subtítulo na página', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(heading).toBeInTheDocument();
  });

  test('verifica se a página possui uma imagem', () => {
    render(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const giphy = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toEqual(giphy);
  });
});

// npx stryker run ./stryker/NotFound.conf.json
