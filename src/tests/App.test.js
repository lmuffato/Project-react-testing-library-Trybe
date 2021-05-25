import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  test('renderiza o titulo  `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});
