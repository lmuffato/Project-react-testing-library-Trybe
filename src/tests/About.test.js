import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('About.js', () => {
  test('Infomation about Pokedex', () => {
    const { container, getByRole } = renderWithRouter(<About />);
    const textoPrincipal = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(textoPrincipal).toBeInTheDocument();
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos.length).toBe(2);

    const fotoPokedex = getByRole('img');
    expect(fotoPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
