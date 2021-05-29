import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente "About"', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const pokedex = getByText(/About Pokédex/i);

    expect(pokedex).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText, getByRole } = render(<About />);

    const about = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });
});
