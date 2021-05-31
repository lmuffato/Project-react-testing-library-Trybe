import React from 'react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('2. Teste o componente <About.js /.', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokeInfo = getByText(/This application simulates a Pokedex/i);

    expect(pokeInfo).toBeInTheDocument();
  });
});
