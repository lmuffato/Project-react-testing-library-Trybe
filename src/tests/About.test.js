import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('test about', () => {
  test('informações sobre a Pokédex.', () => {
    render(<About />);
  });

  test('heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const titulo = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titulo).toHaveValue(/About Pokédex/i);
  });

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
  });

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
  });
});
