import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

describe('tests `about` component ', () => {
  test('contains Pokédex info', () => {
    renderWithRouter((<About />));
    const aboutText = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(aboutText).toBeInTheDocument;
  });

  test('contains a <h2> element with the text `About Pokédex`', () => {
    renderWithRouter((<About />));
    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  })

  test('contains a pokedex image', () => {
    renderWithRouter((<About />));
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  })
});
