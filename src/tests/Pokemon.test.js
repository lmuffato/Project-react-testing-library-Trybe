import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('Testing pokemon', () => {
  const typoke = 'pokemon-type';
  it('testing render card', () => {
    const { getByText, getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);

    const Name = getByText(/Pikachu/i);
    const Type = pokemon[0].type;
    const renderPokemonObjType = getByTestId(typoke);
    const renderPokemonType = renderPokemonObjType[
      Object.keys(renderPokemonObjType)[1]].children;
    const Weigth = getByText(/Average weight: 6.0 kg/i);
    const image = getByRole('img', { name: /Pikachu Sprite/i });
    const moreDetails = getByText(/More Details/i);

    expect(Name).toBeInTheDocument();
    expect(renderPokemonType).toBe(Type);
    expect(Weigth).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(moreDetails.href).toContain('pokemons/25');

    userEvent.click(moreDetails);
    const favPokemonCheckbox = getByText(/Pokémon favoritado/i);
    userEvent.click(favPokemonCheckbox);
    const favoritePokemon = getByAltText(`${pokemon[0].name} is marked as favorite`);

    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
    // Creditos Giovanni Maldonado,
    // Bruno Mendes
    // (Estou me baseando no codigo do Bruno por minha linha de raciocinio ser semelhante a dele)
  });
});
