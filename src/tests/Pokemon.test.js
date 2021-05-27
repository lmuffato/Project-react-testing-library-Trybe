import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the <Pokemon /> component', () => {
  it('Test if a card is rendered with the information of a certain Pokémon.', () => {
    const { getByRole, getByText,
      getAllByText, container } = renderWithRouter(<App />);

    const cardPokemon = container.querySelector('.pokemon');

    const namePokemon = getByText(/pikachu/i);
    const typePokemon = getAllByText(/electric/i)[0];
    const weightPokemon = getByText(/average weight: 6\.0 kg/i);
    const imagePokemon = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');

    expect(cardPokemon).toContainElement(namePokemon);
    expect(cardPokemon).toContainElement(typePokemon);
    expect(cardPokemon).toContainElement(weightPokemon);
    expect(cardPokemon).toContainElement(imagePokemon);
  });
});
