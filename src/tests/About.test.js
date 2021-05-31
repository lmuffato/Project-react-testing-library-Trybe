import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('2. Teste o componente <About.js /.', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokeInfo = getByText(/This application simulates a Pokédex/i);

    expect(pokeInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(
      <About />,
    );
    const h2Test = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(h2Test).toBeInTheDocument();
  });
});
