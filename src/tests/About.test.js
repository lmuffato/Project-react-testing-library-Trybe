import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testa componente About', () => {
  it('testa se possui as infos sobre a Pokedex', () => {
    const { getByRole, getByText } = render(<About />);
    const aboutPokedex = getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
    const pOne = getByText(/This application simulates a Pokédex/);
    expect(pOne).toBeInTheDocument();
    const pTwo = getByText(/One can filter Pokémons by type/);
    expect(pTwo).toBeInTheDocument();
  });
  it('testa se a página possui a imagem da Pokedex', () => {
    const { getByRole } = render(<About />);
    const pokedexImg = getByRole('img', {
      name: 'Pokédex',
    });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
