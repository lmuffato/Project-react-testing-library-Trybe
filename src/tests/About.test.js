import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('teste do componente About', () => {
  it('testes gerais da página About', () => {
    renderWithRouter(<About />);

    let pokedexText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });
    expect(pokedexText).toBeInTheDocument();
    pokedexText = screen.getAllByText(/Pokédex/);
    expect(pokedexText.length).toBe(2);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgPokedex = screen.getByAltText('Pokédex');
    expect(imgPokedex.src).toBe(imgUrl);
  });
});
