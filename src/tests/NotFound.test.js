import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('not found', () => {
  test('este se página contém um heading h2', () => {
    render(<NotFound />);
    const titulo = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(titulo).toBeInTheDocument();
  });

  test('imagem de um pokemon', () => {
    render(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // usei o exemplo dessa resposta no stack overflow https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
