import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requirement 2', () => {
  test('If the page has a h2 with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(
      <About />,
    );
    const h2 = getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('If the page has two paragraphs with texts about Pokédex', () => {
    const { getByText } = renderWithRouter(
      <About />,
    );
    const p1 = getByText(
      /This application simulates a Pokédex/i,
    );
    const p2 = getByText(
      /One can filter Pokémons by type/i,
    );
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('If the page has the right image', () => {
    const { getByRole } = renderWithRouter(
      <About />,
    );
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
