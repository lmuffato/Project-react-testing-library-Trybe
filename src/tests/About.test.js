import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Pagina About', () => {
  it('confere se o h2 tem o texto - About Pokédex ', () => {
    renderWithRouter(<About />);
    const information = screen.getByText('About Pokédex');

    expect(information).toBeInTheDocument();
  });

  it('confere endereço da imagem Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');

    expect(image.getAttribute('src')).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
