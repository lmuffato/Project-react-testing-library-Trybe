import React from 'react';
import renderWithRouter from '../renderWithRouter'
import { render } from '@testing-library/react';
import App from '../App';

describe('Testes componente app', ()=> {
  test('renderiza o titulo  `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name:/Pokédex/i,
      level:1
    });
    expect(heading).toBeInTheDocument();
  });
});
