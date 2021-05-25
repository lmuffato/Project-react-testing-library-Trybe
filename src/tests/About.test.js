import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste do componente About.js', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const pokedexInfo = screen.getByText(/About Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });
  test('Testa se a página contém a imágem de uma Pokedéx', () => {
    render(<About />);
    const imageSrc = screen.getByAltText(/Pokédex/);
    expect(imageSrc.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
