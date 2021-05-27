import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Test About', () => {
  test('testing h2 heading ', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pokedex = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pokedex).toBeInTheDocument();
  });
  test('testing pokedex paragraphs ', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraph1 = getByText(/this application simulates a pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('testing pokedex image ', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
